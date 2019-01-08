const express = require('express'),
jwt = require('jsonwebtoken'),
crypto = require('crypto'),
bcrypt = require('bcryptjs'),
authConfig = require('../config/auth'),
mailer = require('../modules/mailer');

var UserModel = require('../models/user');

const router = express.Router();

/**
 *  REGISTER
 */
router.post('/register', async (req, res) => {
  const user = UserModel.forge(req.body);
  user.set('password', bcrypt.hashSync(user.get('password')));
  user.save().then(() => {
    return res.send();
  }).catch((err) => {
    if(err.code == "ER_DUP_ENTRY") {
      return res.status(400).send("E-mail já registrado");
    }
    return res.status(400).send("Falha ao se registrar, tente novamente")
  });
});

/**
 *  LOGIN
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.checkEmail(email);
 
  if(!user) {
    return res.status(400).send('E-mail inválido ou incorreto');
  }

  if(!await bcrypt.compare(password, user.get('password'))) {
    return res.status(400).send('Senha inválida ou incorreta');
  }

  return res.send({ 
    token: generateToken({ id: user.get('id') }, 86400, authConfig.JWT.SECRET) 
  });
});

/**
 *  FORGOT PASSWORD
 */
router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.checkEmail(email);

  if(!user) {
    return res.status(400).send('E-mail inválido ou incorreto');
  }else{
    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await user.updatePasswordResetFields(token, now);
    
    mailer.sendMail({
      to: email,
      from: '"Celim E-mails 👻" <marcelo.felix@cokato.com.br>',
      subject: "Recuperação de senha",
      template: 'recoverPassword',
      context: { token },
    }, (err) => {
      if(err) {
        return res.status(400).send('Erro ao enviar email com dados para resetar senha');
      }
      return res.send();
    })
  }
})

/**
 *  RESET PASSWORD
 */
router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await UserModel.checkEmail(email);
    
    if(!user) {
      return res.status(400).send("E-mail inválido ou incorreto");
    }

    if(token !== user.get('password_reset_token')) {
      return res.status(400).send("Token inválido");
    }

    const now = new Date();
    if(now > user.get('password_reset_expires')) {
      return res.status(400).send("Seu token expirou, gere um novo");
    }

    user.set('password', bcrypt.hashSync(password));
    user.save().then(() => {
      return res.send();
    }).catch(() => {
      return res.status(400).send("Falha ao resetar senha, tente novamente")
    });

  } catch (error) {
    return res.status(400).send("Falha ao resetar senha, tente novamente");
  }
})

/**
 * GENERATE TOKEN (JSON WEB TOKEN)
 */
function generateToken(params = {}, expire, secret) {
  return jwt.sign(params, secret, {
    expiresIn: expire
  });
}

module.exports = app => app.use("/auth", router);
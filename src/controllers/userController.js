const express = require("express"),
multerFilesFilter = require('../modules/multer')('../public/uploads/imagesUser/',1,1),
path = require('path'),
bcrypt = require('bcryptjs'),
authMiddleware = require('../middlewares/auth');

var UserModel = require('../models/user'),
GroupUserModel = require('../models/groups_users');

const router = express.Router();

/**
 * CHECK USER EXIST BY EMAIL
 */
router.post('/check_user_exist_group', authMiddleware, async (req, res) => {
  const { email, group } = req.body;
  try {
    const user = await UserModel.checkEmail(email);

    if(!user) {
      return res.status(400).send({ error: "E-mail inválido ou incorreto" });
    }

    const groupUser = await GroupUserModel.checkUserExistGroup(user.get('id'), group);
    
    if(groupUser) {
      return res.status(400).send({ error: "Usuário já pertence ao grupo" });
    }

    return res.status(200).send({ email:user.get('email'), name:user.get('name'), image:user.get('image') });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao checar usuário, tente novamente" });
  }
})

/**
 * USER PROFILE 
 */
router.get('/profile', authMiddleware, (req, res) => {
  try {
    UserModel.forge().where({ id: req.userId }).fetch({ require:true, columns:['name', 'email', 'image'] }).then((data) => {
      return res.status(200).json(data);
    }).catch((err) => {
      return res.status(400).send({ error: "Falha ao perfil do usuário, tente novamente" });
    })
  } catch (error) {
    return res.status(400).send({ error: "Falha ao perfil do usuário, tente novamente" });
  }
});

/**
 * USER GROUPS
 */
router.get('/groups', authMiddleware, async (req, res) => {
  try {
    UserModel.forge({id: req.userId})
    .fetch({
      withRelated: [{'groups': (qb) => {
        qb.select('groups.*', 'star')
      }}]
    })
    .then(function(data) {
      return res.status(200).json(data.related('groups'));
    })
    .catch((err) => {
      return res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
    });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
  }
});

/**
 * EDIT USER IMAGE
 */
router.put('/edit_image', [authMiddleware, multerFilesFilter], (req, res) => {
  try {
    if (req.file === undefined) return res.status(400).send({ error: "Nenhuma imagem foi passada" }); 

    UserModel.forge().where({ id: req.userId }).fetch({ require: true }).then((data) => {
      if(data.get('image') != '') {
        const fs = require('fs');
        pathToRemove = path.resolve('../public/uploads/imagesUser/'+data.get('image'));
        fs.unlink(pathToRemove, (err) => {
          if (err) res.status(400).send({ error: "O grupo não possui foto" });
        });
      }

      data.set('image', req.file.filename);
      data.save().then(() => {
        return res.send();
      });
    }).catch((err) => {
      return res.status(400).send({ error: "Falha ao editar foto de usuario, tente novamente" });
    });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao editar foto de usuario, tente novamente" });
  }
});

/**
 * REMOVE USER IMAGE
 */
router.post('/remove_image', authMiddleware, (req, res) => {
  try {
    UserModel.forge().where({ id: req.userId }).fetch({require: true}).then((data) => {
        if(data.get('image') != '') {
            const fs = require('fs');
            pathToRemove = path.resolve('../public/uploads/imagesUser/'+data.get('image'));
            fs.unlink(pathToRemove, (err) => {
                if (err) res.status(400).send({ error: "O usuário não possui foto" });
            });
        }
        
        data.set('image', '');
        data.save().then(() => {
          return res.send();
        });
    }).catch((err) => {
      return res.status(400).send({ error: "Falha buscar usuário, tente novamente" });
    });
  } catch (error) {
    return res.status(400).send({ error: "Falha ao remover imagem do usuário, tente novamente" });
  }
});

/**
 * EDIT USER NAME
 */
router.post('/edit_name', authMiddleware, (req, res) => {
  const { name } = req.body;
  try {
    UserModel.forge().where({ id: req.userId }).fetch({ require: true }).then((data) => {
      data.set('name', name);
      data.save().then(() => {
        return res.send();
      });
    }).catch((err) => {
      return res.status(400).send({ error: "Falha ao editar nome de usuario, tente novamente" });
    })
  } catch (error) {
    return res.status(400).send({ error: "Falha ao editar nome de usuario, tente novamente" });
  }
});

/**
 * EDIT USER EMAIL
 */
router.post('/edit_email', authMiddleware, (req, res) => {
  const { email } = req.body;
  try {
    UserModel.forge().where({ id: req.userId }).fetch({ require: true }).then((data) => {
      data.set('email', email);
      data.save().then(() => {
        return res.send();
      }).catch((err) => {
        if(err.code == "ER_DUP_ENTRY") {
          return res.status(400).send({ error: "E-mail já registrado" });
        }
      })
    }).catch((err) => {
      return res.status(400).send({ error: "Falha ao editar email de usuario, tente novamente" });
    })
  } catch (error) {
    return res.status(400).send({ error: "Falha ao editar email de usuario, tente novamente" });
  }
});

/**
 * EDIT USER PASSWORD
 */
router.post('/edit_password', authMiddleware, (req, res) => {
  const { password } = req.body;
  try {
    UserModel.forge().where({ id: req.userId }).fetch({ require: true }).then((data) => {
      data.set('password', bcrypt.hashSync(password));
      data.save().then(() => {
        return res.send();
      });
    }).catch((err) => {
      return res.status(400).send({ error: "Falha ao editar senha de usuario, tente novamente" });
    })
  } catch (error) {
    return res.status(400).send({ error: "Falha ao editar senha de usuario, tente novamente" });
  }
});

module.exports = app => app.use("/user", router);
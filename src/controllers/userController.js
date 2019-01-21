const express = require("express"),
multerFilesFilter = require('../modules/multer')('../public/uploads/imagesUser/',1,1),
path = require('path'),
authMiddleware = require('../middlewares/auth');

var UserModel = require('../models/user');

const router = express.Router();

/**
 * USER GROUPS
 */
router.get('/groups', authMiddleware, async (req, res) => {
  try {
    UserModel.forge({id: req.userId})
    .fetch({withRelated: ['groups']})
    .then(function(data) {
      res.status(200).json(data.related('groups'));
    })
    .catch((err) => {
      res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
    });
  } catch (error) {
    res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
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
      return res.status(400).send({ error: "Falha ao se registrar, tente novamente" });
    })
  } catch (error) {
    return res.status(400).send({ error: "Falha ao se registrar, tente novamente" });
  }
});

module.exports = app => app.use("/user", router);
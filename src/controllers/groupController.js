const express = require("express"),
authMiddleware = require('../middlewares/auth'),
multerFilesFilter = require('../modules/multer')('../public/uploads/imagesGroup/',1,1),
path = require('path');

var GroupModel = require('../models/group'),
GroupUserModel = require('../models/groups_users');

const router = express.Router();

/**
 * CREATE GROUP
 */
router.post('/new',[authMiddleware, multerFilesFilter], async (req, res) => {
    try {
        if (!(req.file === undefined)) { 
            req.body.image = req.file.filename;
        }

        GroupModel.forge(req.body)
        .save().then((group) => {
            GroupUserModel.forge({
                group_id: group.get('id'),
                user_id: req.userId,
                role_id: 'admin'
            }).save().then(() => {
                res.send();
            });
        })
        .catch((err) => {
            res.status(400).send({ error: "Falha ao cadastrar grupo, tente novamente" });
        })
    } catch (error) {
        res.status(400).send({ error: "Falha ao cadastrar grupo, tente novamente" });
    }
});

/**
 * EDIT GROUP
 */
router.post('/edit', authMiddleware, (req, res) => {
    const {id, name, description} = req.body;
    try {
        GroupModel.forge().where({id}).fetch({require: true}).then((data) => {
            data.set('name', name);
            data.set('description', description);
            data.save().then(() => {
                res.send();
            })
        }).catch((error) => {
            res.status(400).send({ error: "O grupo não existe" });
        })
    } catch (error) {
        res.status(400).send({ error: "Falha ao editar grupo, tente novamente" });
    }
})

/**
 * REMOVE GROUP
 */
router.post('/remove', authMiddleware, (req,res) => {
    try {
        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {

            if(data.get('image') != '') {
                const fs = require('fs');
                pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
                fs.unlink(pathToRemove, (err) => {
                    if (err) res.status(400).send({ error: "O grupo não possui foto" });
                });
            }

            data.destroy().then(async () => {
                res.send();
            });

        }).catch((error) => {
            res.status(400).send({ error: "O grupo não existe" });
        })
    } catch (error) {
        res.status(400).send({ error: "Falha ao editar grupo, tente novamente" });
    }
});

/**
 * EDIT GROUP IMAGE
 */
router.post('/edit_image', [authMiddleware, multerFilesFilter], (req, res) => {
    try {

        if (req.file === undefined) res.status(400).send({ error: "Nenhuma imagem foi passada" });

        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {
            if(data.get('image') != '') {
                const fs = require('fs');
                pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
                fs.unlink(pathToRemove, (err) => {
                    if (err) res.status(400).send({ error: "O grupo não possui foto" });
                });
            }
            
            data.set('image', req.file.filename);
            data.save().then(() => {
                res.send();
            });
        }).catch((err) => {
            res.status(400).send({ error: "Falha buscar grupo, tente novamente" });
        });
    } catch (error) {
        res.status(400).send({ error: "Falha ao remover imagem do grupo, tente novamente" });
    }
});

/**
 * REMOVE GROUP IMAGE
 */
router.post('/remove_image', authMiddleware, (req, res) => {
    try {
        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {
            if(data.get('image') != '') {
                const fs = require('fs');
                pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
                fs.unlink(pathToRemove, (err) => {
                    if (err) res.status(400).send({ error: "O grupo não possui foto" });
                });
            }
            
            data.set('image', '');
            data.save().then(() => {
                res.send();
            });
        }).catch((err) => {
            res.status(400).send({ error: "Falha buscar grupo, tente novamente" });
        });
    } catch (error) {
        res.status(400).send({ error: "Falha ao editar imagem do grupo, tente novamente" });
    }
})

/**
 * GROUP USERS
 */
router.post('/users', authMiddleware, async (req, res) => {
    try {
        GroupModel.forge(req.body)
        .fetch({ 
            withRelated: [{'users': (qb) => {
                qb.select('users.*','star','role_id');
            }}]
        })
        .then(function(data) {
          res.status(200).json(data.related('users'));
        })
        .catch((err) => {
            console.log(err);
          res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
        });
    } catch (error) {
      res.status(400).send({ error: "Falha ao buscar usuarios do grupo, tente novamente" });
    }
  });

module.exports = app => app.use("/group", router);
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
 * REMOVE GROUP IMAGE
 */
router.post('/remove_image', authMiddleware, (req, res) => {
    try {
        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {
            const fs = require('fs');
            pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
            fs.unlink(pathToRemove, (err) => {
                if (err) res.status(400).send({ error: "O grupo não possui foto" });
            });
            
            data.set('image', null);
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

module.exports = app => app.use("/group", router);
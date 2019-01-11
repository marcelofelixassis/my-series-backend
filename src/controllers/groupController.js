const express = require("express"),
authMiddleware = require('../middlewares/auth'),
multer = require('multer'),
path = require('path');

var GroupModel = require('../models/group');
var GroupUserModel = require('../models/groups_users');

const router = express.Router();

/**
 * CREATE GROUP
 */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('../public/uploads/imagesGroup/'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
   
var upload = multer({
    storage: storage,
    limits: {
        files: 1,
        fileSize: 1024 * 1024
    },
    fileFilter: function(req, file, cb) {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('Somente imagens podem ser usadas'));
        } 
        return cb(null, true);
    }
}).single('imagesGroup');

router.post('/new',[authMiddleware, upload], async (req, res) => {
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

module.exports = app => app.use("/group", router);
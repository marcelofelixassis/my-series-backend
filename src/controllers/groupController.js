const express = require("express"),
authMiddleware = require('../middlewares/auth'),
multer = require('../modules/multer');

var GroupModel = require('../models/group');
var GroupUserModel = require('../models/groups_users');

const router = express.Router();

/**
 * CREATE GROUP
 */
router.post('/new', [authMiddleware, multer.upload.single("imagesGroup")], async (req, res) => {
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
            res.status(400).send({ error: "Falha ao cadastrar grupo, tente novamenteryreyreyreye" });
        })
    } catch (error) {
        res.status(400).send({ error: "sdadadasd" });
    }
});

module.exports = app => app.use("/group", router);
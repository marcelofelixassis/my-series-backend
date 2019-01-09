const express = require("express"),
authMiddleware = require('../middlewares/auth');

var GroupModel = require('../models/group');
var GroupUserModel = require('../models/groups_users');

const router = express.Router();

/**
 * CREATE GROUP
 */
router.post('/new', authMiddleware, async (req, res) => {
    try {
        GroupModel.forge(req.body)
        .save().then((group) => {
            GroupUserModel.forge({
                group_id: group.get('id'),
                user_id: req.userId,
            }).save().then(() => {
                res.send();
            });
        })
        .catch((err) => {
            res.status(400).send({ error: "Falha ao cadastrar grupo, tente novamente" });
        })
    } catch (error) {
        res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
    }
});

module.exports = app => app.use("/group", router);
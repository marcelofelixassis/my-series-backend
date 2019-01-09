const express = require("express"),
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

module.exports = app => app.use("/user", router);
const express = require("express");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

var UserModel = require('../models/user');

// router.get('/check/token', authMiddleware, (req, res) => {
//   return res.status(200).send(true);
// })

// router.get('/check/token/email', authEmailRecoverMiddleware, (req, res) => {
//   return res.status(200).send(true);
// })

router.post('/reset', authMiddleware, async (req, res) => {
  
})

router.get('/teste',authMiddleware, async (req, res) => {
  SeriesModel
    .fetchAll()
    .then(function(series) {
      res.json({ series });
    });
});

router.get('/series', async (req, res) => {
  
  SeriesModel
    .fetchAll()
    .then(function(series) {
      res.json({ series });
    });
});

module.exports = app => app.use("/user", router);
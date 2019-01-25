const express = require('express'),
authMiddleware = require('../middlewares/auth');

var SerieModel = require('../models/serie');

const router = express.Router();

/**
 * {GET} - ALL SERIES
 */
router.get('/all', authMiddleware, (req, res) => {
    try {
        SerieModel.forge().fetchAll({ require: true, columns: ['id', 'name AS text'] }).then((data) => {
            res.status(200).json(data);
        }).catch((err) => {
            return res.status(400).send({ error: "Falha ao buscar series, tente novamente" }); 
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao buscar series, tente novamente" }); 
    }
})

/**
 * {GET} - ONE SERIE BY ID
 */
router.get('/:id', authMiddleware, (req, res) => {
    const { id } = req.params;
    try {
        SerieModel.forge().where({ id:id }).fetch({ required: true }).then((data) => {
            return res.status(200).json(data);
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao buscar series, tente novamente" }); 
    }
})

module.exports = app => app.use("/serie", router);
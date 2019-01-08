const jwt = require("jsonwebtoken"),
authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send('Nenhum token fornecido');
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        return res.status(401).send('Erro token');
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send('Token desformatado');
    }

    jwt.verify(token, authConfig.JWT_SECRET.AUTH, (err, decoded) => {
        if(err) {
            return res.status(401).send('Token invalido');
        }

        req.userId = decoded.id;
        return next();
    })
}
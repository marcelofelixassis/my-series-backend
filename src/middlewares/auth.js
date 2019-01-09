const jwt = require("jsonwebtoken"),
authConfig = require('../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({ error: 'Nenhum token fornecido' });
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        return res.status(401).send({ error: 'Erro token' });
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token desformatado' });
    }

    jwt.verify(token, authConfig.JWT.SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).send({ error: 'Token invalido' });
        }

        req.userId = decoded.id;
        return next();
    })
}
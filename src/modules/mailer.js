const { host, port, user, pass } = require('../config/mail.json'), 
nodemailer = require('nodemailer'),
hbs = require('nodemailer-express-handlebars'),
path = require('path');

const options = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: path.resolve('../public/templates/emails'),
        partialsDir : path.resolve('../public/templates/emails/partials')
    },
    viewPath: path.resolve('../public/templates/emails'),
    extName: '.hbs'
};

const transporter = nodemailer.createTransport({
    pool:true,
    host,
    port,
    secure: true,
    auth: {
        user,
        pass
    }
});

transporter.use('compile', hbs(options));

module.exports = transporter;
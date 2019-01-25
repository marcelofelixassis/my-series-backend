const express = require("express"),
authMiddleware = require('../middlewares/auth'),
multerFilesFilter = require('../modules/multer')('../public/uploads/imagesGroup/',1,1),
path = require('path');

var GroupModel = require('../models/group'),
UserModel = require('../models/user'),
GroupUserModel = require('../models/groups_users'),
GroupSerieModel = require('../models/groups_series');

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
                return res.send();
            });
        })
        .catch((err) => {
            return res.status(400).send({ error: "Falha ao cadastrar grupo, tente novamente" });
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao cadastrar grupo, tente novamente" });
    }
});

/**
 * EDIT GROUP
 */
router.post('/edit', authMiddleware, (req, res) => {
    const {id, name, description} = req.body;
    try {
        GroupModel.forge().where({id}).fetch({require: true}).then((data) => {
            data.set('name', name);
            data.set('description', description);
            data.save().then(() => {
                return res.send();
            })
        }).catch((error) => {
            return res.status(400).send({ error: "O grupo não existe" });
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao editar grupo, tente novamente" });
    }
})

/**
 * REMOVE GROUP
 */
router.post('/remove', authMiddleware, (req,res) => {
    try {
        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {

            if(data.get('image') != '') {
                const fs = require('fs');
                pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
                fs.unlink(pathToRemove, (err) => {
                    if (err) return res.status(400).send({ error: "O grupo não possui foto" });
                });
            }

            data.destroy().then(async () => {
                return res.send();
            });

        }).catch((error) => {
            return res.status(400).send({ error: "O grupo não existe" });
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao editar grupo, tente novamente" });
    }
});

/**
 * EDIT GROUP IMAGE
 */
router.post('/edit_image', [authMiddleware, multerFilesFilter], async (req, res) => {
    try {

        if (req.file === undefined) {
            return res.status(400).send({ error: "Nenhuma imagem foi passada" });
        }

        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {
            if(data.get('image') != '') {
                const fs = require('fs');
                pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
                fs.unlink(pathToRemove, (err) => {
                    if (err) return res.status(400).send({ error: "O grupo não possui foto" });
                });
            }
            
            data.set('image', req.file.filename);
            data.save().then(() => {
                return res.send();
            });
        }).catch((err) => {
            return res.status(400).send({ error: "Falha buscar grupo, tente novamente" });
        });
    } catch (error) {
        return res.status(400).send({ error: "Falha ao remover imagem do grupo, tente novamente" });
    }
});

/**
 * REMOVE GROUP IMAGE
 */
router.post('/remove_image', authMiddleware, (req, res) => {
    try {
        GroupModel.forge().where(req.body).fetch({require: true}).then((data) => {
            if(data.get('image') != '') {
                const fs = require('fs');
                pathToRemove = path.resolve('../public/uploads/imagesGroup/'+data.get('image'));
                fs.unlink(pathToRemove, (err) => {
                    if (err) return res.status(400).send({ error: "O grupo não possui foto" });
                });
            }
            
            data.set('image', '');
            data.save().then(() => {
                return res.send();
            });
        }).catch((err) => {
            return res.status(400).send({ error: "Falha buscar grupo, tente novamente" });
        });
    } catch (error) {
        return res.status(400).send({ error: "Falha ao remover imagem do grupo, tente novamente" });
    }
});

/**
 * GROUP USERS
 */
router.post('/users', authMiddleware, async (req, res) => {
    try {
        GroupModel.forge(req.body)
        .fetch({ 
            withRelated: [{'users': (qb) => {
                qb.select('users.*','star','role_id');
            }}]
        })
        .then(function(data) {
            return res.status(200).json(data.related('users'));
        })
        .catch((err) => {
            return res.status(400).send({ error: "Falha ao buscar grupos, tente novamente" });
        });
    } catch (error) {
        return res.status(400).send({ error: "Falha ao buscar usuarios do grupo, tente novamente" });
    }
});

/**
 * ADD USER TO GROUP
 */
router.post('/add_user', authMiddleware, async (req, res) => {
    const { group, email } = req.body;
    try {
        const user = await UserModel.checkEmail(email);

        if(!user) {
            return res.status(400).send({ error: "E-mail inválido ou incorreto" });
        }

        GroupUserModel.forge(
            {group_id: group,
            user_id: user.get('id'),
            role_id: "member",
            star: 0}
        ).save().then(() => {
           return res.send()
        }).catch((err) => {
            return res.status(400).send({ error: "Falha ao adicionar usuario ao grupo, tente novamente" });
        })
    } catch (error) {
       return res.status(400).send({ error: "Falha ao adicionar usuario ao grupo, tente novamente" });
    }
});

/**
 * ADD OR REMOVE GROUP STAR
 */
router.post('/change_star', authMiddleware, (req, res) => {
    const { id } = req.body;
    try {
        GroupUserModel.forge().where({ group_id: id, user_id: req.userId }).fetch({ require: true }).then((data) => {
            data.set('star', !data.get('star'));
            data.save().then(() => {
                return res.send();
            })
        }).catch((error) => {
            return res.status(400).send({ error: "Falha ao mudar estrela ao grupo, tente novamente" });
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao mudar estrela ao grupo, tente novamente" });
    }
});

/**
 * ALL SERIES
 */
router.post('/all_series', authMiddleware, (req, res) => {
    try {
        GroupModel.forge(req.body)
        .fetch({ 
            withRelated: 'series'
        })
        .then(function(data) {
          return res.status(200).json(data.related('series'));
        })
        .catch((err) => {
            return res.status(400).send({ error: "Falha ao buscar series, tente novamente" });
        });
    } catch (error) {
        return res.status(400).send({ error: "Falha ao buscar series do grupo, tente novamente" });
    }
})

/** 
 * ADD SERIE TO A GROUP
*/
router.post('/add_serie', authMiddleware, async (req, res) => {
    const { serie, group, score } = req.body;
    try {
        const serieGroup = await GroupSerieModel.checkSerieExistGroup(serie, group);

        if(serieGroup) {
            return res.status(400).send({ error: "Essa serie já foi adicionada ao grupo, tente novamente" });
        }

        GroupSerieModel.forge(
            {group_id: group,
            serie_id: serie,
            score:score,}
        ).save().then(() => {
           return res.send()
        }).catch((err) => {
            return res.status(400).send({ error: "Falha ao adicionar serie ao grupo, tente novamente" });
        })

    } catch (error) {
        return res.status(400).send({ error: "Falha ao adicionar serie ao grupo, tente novamente" });
    }
})

/**
 * REMOVE SERIE FROM GROUP
 */
router.post('/serie_remove', authMiddleware, (req,res) => {
    try {
        GroupSerieModel.forge().where(req.body).fetch({require: true}).then((data) => {

            data.destroy().then(async () => {
                return res.send();
            });

        }).catch((error) => {
            return res.status(400).send({ error: "A serie não está no grupo" });
        })
    } catch (error) {
        return res.status(400).send({ error: "Falha ao remover serie do grupo, tente novamente" });
    }
});

module.exports = app => app.use("/group", router);
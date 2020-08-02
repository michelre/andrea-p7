// Imports
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');

// Routes
module.exports = {
    createMessage: function (req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        const title = req.body.title;
        const content = req.body.content;
        const image = req.body.image

        // si le champ title ou le champ content sont vide = erreur !
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findById(userId)
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        console.log(err)
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {

                    models.Message.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId: userFound.id,
                        attachment: req.file.filename
                    })
                        .then(function (newMessage) {
                            done(newMessage);
                        });

                } else {
                    res.status(400).json({ 'error': 'user not found' });
                }
            }
        ], function (newMessage) {
            if (newMessage) {
                return res.status(201).json(newMessage);
            } else {
                return res.status(500).json({ 'error': 'cannot post message' });
            }
        });
    },


    listMessages: function (req, res) {
        const userId = jwtUtils.getUserId(req.headers['authorization']);
        const fields = req.query.fields; // permet de selectionner les colonnes qu'on veut afficher
        const limit = parseInt(req.query.limit); // pour visualiser juste un nombre de messages
        const offset = parseInt(req.query.offset);
        const order = req.query.order; // pour mettre les messages dans un ordre particulier

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['createdAt', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            include: [{
                model: models.User,
                as: 'User',
                attributes: ['firstName', 'lastName'],
            }]
        }).then(function (messages) {
            if (messages) {
                const jsonMessages = []
                for (let i = 0; i < messages.length; i++) {
                    const jsonMessage = messages[i].toJSON();
                    //Si le message concerne l'utilisateur connecté, on ajoute un champ modifiable
                    jsonMessage['modifiable'] = userId === jsonMessage.UserId
                    jsonMessages.push(jsonMessage)
                }
                res.status(200).json(jsonMessages);
            } else {
                res.status(404).json({ "error": "no messages found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields ' });
        })
    },

    getMessage: function (req, res) {
        models.Message.findByPrimary(req.params.id).then(function (message) {
            if (message) {
                res.status(200).json(message);
            } else {
                res.status(404).json({ "error": "no message found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields ' });
        })
    },

    // Modifier un post
    updatePost: function (req, res) {
        const id = req.params.id
        const title = req.body.title
        const content = req.body.content
        models.Message.findByPrimary(req.params.id).then(function (message) {
            if (message) {
                message.update({
                    title,
                    content,
                }).then(() => {
                    res.status(200).json(message);
                }).catch(() => {
                    res.status(500).json({ 'error': 'invalid fields ' });
                })

            } else {
                res.status(404).json({ "error": "no message found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields ' });
        })
    },

    // Effacer un post
    deletePost: function (req, res) {
        models.Message.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => res.status(200).json({ message: 'Post deleted !' }))
            .catch(error => res.status(400).json({ error }));
    }
}



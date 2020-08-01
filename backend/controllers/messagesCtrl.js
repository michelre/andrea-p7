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

        // si le champ title ou le champ content sont vide = erreur !
        if (title == null || content == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }

        asyncLib.waterfall([
            function (done) {
                models.User.findOne({
                    where: { id: userId }
                })
                    .then(function (userFound) {
                        done(null, userFound);
                    })
                    .catch(function (err) {
                        return res.status(500).json({ 'error': 'unable to verify user' });
                    });
            },
            function (userFound, done) {
                if (userFound) {

                    models.Message.create({
                        title: title,
                        content: content,
                        likes: 0,
                        UserId: userFound.id
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
        const fields = req.query.fields; // permet de selectionner les colonnes qu'on veut afficher
        const limit = parseInt(req.query.limit); // pour visualiser juste un nombre de messages
        const offset = parseInt(req.query.offset);
        const order = req.query.order; // pour mettre les messages dans un ordre particulier

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['title', 'ASC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            // limit: (!isNaN(limit)) ? limit : null,
            // offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                as: 'User',
                attributes: ['firstName', 'lastName'],
            }]
        }).then(function (messages) {
            if (messages) {
                res.status(200).json(messages);
            } else {
                res.status(404).json({ "error": "no messages found" });
            }
        }).catch(function (err) {
            console.log(err);
            res.status(500).json({ 'error': 'invalid fields ' });
        })
    },

    // Modifier un post
    updatePost: function (req, res) {
        models.Message.update({
            title: title,
            content: content,
            likes: 0,
            UserId: userFound.id
        })
            .then(function () {
                done(User);
            }).catch(function (err) {
                res.status(500).json({ 'error': 'NOOOOOOOO' });
            });
    }

}



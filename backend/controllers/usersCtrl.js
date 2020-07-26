// Imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const models = require('../models');

// Routes
module.exports = {
    register: function (req, res) {
        // Params
        const email = req.body.email;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        if (email == null || password == null || firstName == null || lastName == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User.findOne({
            attributes: ['email'],
            where: {email: email}
        })
            .then(function (userFound) {
                if (!userFound) {
                    bcrypt.hash(password, 10, function (err, bcryptedPassword) {
                        const newUser = models.User.create({
                            email: email,
                            password: bcryptedPassword,
                            firstName: firstName,
                            lastName: lastName
                        })
                            .then(function (newUser) {
                                return res.status(201).json({
                                    "status": "OK",
                                    'userId': newUser.id,
                                    'token': 'ABCD' // Fake token
                                })
                            })
                            .catch(function (err) {
                                return res.status(500).json({'error': 'cannot add user'});
                            })
                    })
                } else {
                    return res.status(409).json({'error': 'user already exist'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'unable to verify user'});
            });

    },
    login: function (req, res) {
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        models.User.findOne({
            attributes: ['email', 'password'],
            where: {email: email}
        })
            .then(function (userFound) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password).then((resCompare) => {
                        if(resCompare){
                            // Generer token
                            res.status(200).json({ 'status': 'OK', token: 'ABCD' })
                        } else {
                            res.status(401).json({ error: 'password error' })
                        }
                    })
                } else {
                    return res.status(401).json({'error': 'user not found'});
                }
            })
            .catch(function (err) {
                return res.status(500).json({'error': 'unable to verify user'});
            });
    }
}

// Imports
const express = require('express');
const userCtrl = require('../controllers/usersCtrl');

// Router
exports.router = (function () {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);
    apiRouter.route('/users/me/').get(userCtrl.getUserProfile);

    return apiRouter;
})();

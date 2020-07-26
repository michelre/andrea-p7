// Imports
const express = require('express');
const userCtrl = require('./routes/usersCtrl');

// Router
exports.router = (function () {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);

    return apiRouter;
})();

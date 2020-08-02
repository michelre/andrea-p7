// Imports
const express = require('express');
const userCtrl = require('../controllers/usersCtrl');

// Router
exports.router = (function () {
    const userRouter = express.Router();

    //Users routes
    userRouter.post('/users/register/', userCtrl.register);
    userRouter.post('/users/login/', userCtrl.login);
    userRouter.get('/users/me/', userCtrl.getUserProfile);
    userRouter.put('/users/me/', userCtrl.updateUserProfile);


    return userRouter;
})();

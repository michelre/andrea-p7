// Imports
const express = require('express');
const userCtrl = require('../controllers/usersCtrl');
const auth = require('../middlewares/auth') //

// Router
exports.router = (function () {
    const userRouter = express.Router();

    //Users routes
    userRouter.post('/users/register/', userCtrl.register);
    userRouter.post('/users/login/', userCtrl.login);
    userRouter.get('/users/me/', auth, userCtrl.getUserProfile);
    userRouter.put('/users/me/', auth, userCtrl.updateUserProfile);


    userRouter.delete("/users/:id", auth, userCtrl.deleteProfil); //


    return userRouter;
})();

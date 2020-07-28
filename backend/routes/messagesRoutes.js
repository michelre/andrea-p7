// Imports
const express = require('express');
const messagesCtrl = require('../controllers/messagesCtrl');
const auth = require('../middlewares/auth')
// const likesCtrl = require('./routes/likesCtrl');

// Router
exports.router = (function () {
    const messagesRouter = express.Router();

    // Messages routes

    messagesRouter.post('/messages/new/', auth, messagesCtrl.createMessage);
    messagesRouter.get('/messages/', messagesCtrl.listMessages);

    //Likes
    // apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);
    // apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost);

    return messagesRouter;
})();
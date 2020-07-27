// Imports
const express = require('express');
const messagesCtrl = require('../controllers/messagesCtrl');
// const likesCtrl = require('./routes/likesCtrl');

// Router
exports.router = (function () {
    const messagesRouter = express.Router();

    // Messages routes
    messagesRouter.route('/messages/new/').post(messagesCtrl.createMessage);
    messagesRouter.route('/messages/').get(messagesCtrl.listMessages);

    //Likes
    // apiRouter.route('/messages/:messageId/vote/like').post(likesCtrl.likePost);
    // apiRouter.route('/messages/:messageId/vote/dislike').post(likesCtrl.dislikePost);

    return messagesRouter;
})();

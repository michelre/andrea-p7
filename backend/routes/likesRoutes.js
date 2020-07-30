// Imports

const express = require('express');
const likesCtrl = require('../controllers/likesCtrl');
const auth = require('../middlewares/auth')

// Router
exports.router = (function () {
    const likesRouter = express.Router();

    // Likes routes
    likesRouter.post('/messages/:messageId/vote/like', auth, likesCtrl.likePost);
    likesRouter.post('/messages/:messageId/vote/dislike', auth, likesCtrl.dislikePost);

    return likesRouter;
})();

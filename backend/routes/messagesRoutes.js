// Imports
const express = require('express');
const messagesCtrl = require('../controllers/messagesCtrl');
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config');

// Router
exports.router = (function () {
    const messagesRouter = express.Router();

    // Messages routes
    messagesRouter.post('/messages/new/', auth, multer, messagesCtrl.createMessage);
    messagesRouter.get('/messages/', auth, messagesCtrl.listMessages);
    messagesRouter.get('/messages/:id', auth, messagesCtrl.getMessage);
    messagesRouter.put('/messages/:id', auth, multer, messagesCtrl.updatePost);
    messagesRouter.delete('/messages/delete/:id', auth, messagesCtrl.deletePost);



    return messagesRouter;
})();

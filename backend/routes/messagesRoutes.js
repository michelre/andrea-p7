// Imports
const express = require('express');
const messagesCtrl = require('../controllers/messagesCtrl');
const auth = require('../middlewares/auth')

// Router
exports.router = (function () {
    const messagesRouter = express.Router();

    // Messages routes
    messagesRouter.post('/messages/new/', auth, messagesCtrl.createMessage);
    messagesRouter.get('/messages/', auth, messagesCtrl.listMessages);
    messagesRouter.get('/messages/:id', auth, messagesCtrl.getMessage);
    messagesRouter.put('/messages/:id', auth, messagesCtrl.updatePost);


    return messagesRouter;
})();

const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const apiRouter = require('./routes/userRoutes').router;
const messagesRouter = require('./routes/messagesRoutes').router;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/', apiRouter);
app.use('/api/', messagesRouter);


/**
 * Routes User
 *  Signin
 *  Signup
 */

/**
 * Routes Article (authentifiée)
 * Middleware d'authentification avec JWT
 *  Create (id, contenu (html)
 *  Update
 *  Delete
 *  GetAll (du plus récent au plus ancien)
 */

module.exports = app;

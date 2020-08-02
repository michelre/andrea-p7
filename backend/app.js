// Imports
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const userRouter = require('./routes/userRoutes').router;
const messagesRouter = require('./routes/messagesRoutes').router;
const likesRouter = require('./routes/likesRoutes').router;
const path = require('path');

const app = express();

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/', userRouter);
app.use('/api/me/', userRouter);
app.use('/api/', messagesRouter);
app.use('/api/', likesRouter);

module.exports = app;

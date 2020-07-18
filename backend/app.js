const express = require('express');
const bodyParser = require('body-parser');
const mySql = require('mysql');
const Sequelize = require('sequelize');
const connection = require('../mySqlConfig');
const dotenv = require('dotenv').config();


// test DB
connection.sequelize.authenticate()
.then(() => console.log('database connected ...!'))
.catch(error => console.log(error))

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'User créé !'
  });
});



module.exports = app;
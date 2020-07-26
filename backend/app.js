const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const apiRouter = require('./apiRouter').router;

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

// app.post('/login', (req, res, next) => {
//   console.log(req.body);
//   // Récupérer l'utilisateur avec le mail saisi
//   // Si l'utilisateur n'existe pas --> return 401 (pas autorisé)
//   // Si l'utilisateur est trouvé, on vérifie le password
//   // Si password saisie n'est pas le bon --> return 401
//   // Si password OK --> générer token status OK
//   res.status(200).json({
//     status: 'OK',
//     token: 'JSON WEB TOKEN'
//   });
// });

// app.post('/signup', (req, res, next) => {
//   console.log(req.body);
//   // Vérifier si le mail n'existe pas déjà en base
//   // Si déjà existant --> 400
//   // Sinon, insérer l'utilisateur en BDD
//   /**
//    * Voir Doc Sequelize
//     const user = await User.create({
//       username: 'alice123',
//       isAdmin: true
//     }, { fields: ['username'] });
//      // let's assume the default of isAdmin is false
//      console.log(user.username); // 'alice123'
//      console.log(user.isAdmin); // false
//    */
//   res.status(201).json({
//     status: 'OK',
//     message: 'User créé !'
//   });
// });



module.exports = app;

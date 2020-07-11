const express = require('express')
const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // tout le monde a le droit d'acceder à notre API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // on donne l'autorisation de utiliser certaines entete
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // et aussi sur certaines methodes
    next(); // j'appelle next() pour passer au middleware d'apres
});

app.get('/', function (req, res) {
    res.send({'status': 'ok'});
})

app.get('/login', function (req, res) {
    res.send({'status': 'ok'});
})

app.listen(3005, function () {
    console.log('Example app listening on port 3005!')
})

const mysql = require ('mysql');

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_DATABASE
});
 
connection.connect(function (err){
    if(err){
        console.error('Error connecting: ' + err.stack)
        return
    }
    console.log('connected as id ' + conn.threadId)
});

module.exports = connection;
 
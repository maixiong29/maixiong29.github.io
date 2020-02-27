
var mysql = require('mysql');
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: 'word',
    database: 'burgers_db'
  });
}


  connection.connect();
  // Export connection for our ORM to use.
  module.exports = connection;

const Sequelize = require('sequelize');
const sequelize = new Sequelize('restaurant_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;

const mysql2 = require("mysql2/promise");

// Create a connection
const connection = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurant_system",
    waitForConnections: true,
    // connectionLimit: 10,
    queueLimit: 0
});

connection.getConnection((err, connection)=>{
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST'){
      console.error('Database connection was closed');
    }
    if(err.code === 'ER_CON_COUNT_ERROR'){
      console.error('Database has too many connections.');
    }
    if(err.code === 'ECONNREFUSED'){
      console.error('Database connection was refused');
    }
  }
  if(connection) connection.release();

  return;

});

// connection.query = util.promisify(connection.query);
// connection.execute = util.promisify(connection.execute);


module.exports = connection;

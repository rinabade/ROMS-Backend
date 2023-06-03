const Sequelize = require('sequelize');
const sequelize = new Sequelize('restaurant_system', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;



const mysql2 = require("mysql2/promise");

// Create a connection
const connection = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant_system',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;

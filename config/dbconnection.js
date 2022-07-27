
const { createPool } = require('mysql2');
require('dotenv').config();

const connection = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    port: process.env.DB_PORT
});



// Connect to DB
connection.getConnection((err, connection) => {
    if (err) throw err;// not connected!
    console.log(`Connected as ID` + connection.threadId);
});



// exports.connection = connection;
module.exports = connection;

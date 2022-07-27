
const { createPool } = require('mysql2');
require('dotenv').config();

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    port: process.env.DB_PORT
});

// console.log(pool);

// Connect to DB
pool.getConnection((err, connection) => {
    if (err) throw err;// not connected!
    console.log(`Connected as ID` + connection.threadId);
});


let shopDB = {};

shopDB.all = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });


    });

};


shopDB.one = (product_id) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products where product_id = ?', [product_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });


    });
};
shopDB.update = (product_id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM products where product_id = ?', [product_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });


    });
};

shopDB.delete = (product_id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM products where product_id = ?', [product_id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });


    });
};

module.exports = shopDB;

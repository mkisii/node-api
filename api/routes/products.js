const express = require('express');
const connection = require('../../config/dbconnection');


const router = express.Router();

// Read/listing all products in the database
router.get('/read', async (request, response, next) => {
    const query = 'SELECT * FROM products';
    connection.query(query, (err, results) => {
        if (!err) {
            return response.status(200).json(results);
        } else {
            return response.status(500).json(err);
        }
    });
});

// Creating the prodcuts
router.post('/create', (request, response, next) => {

    const product = request.body;

    const query = "insert into products (product_name,description, price, weigth) values (?, ?, ?, ?)";
    connection.query(query, [product.product_name, product.description, product.price, product.weigth], (err, result) => {
        if (!err) {
            response.status(201).json({
                message: "Product created successfully"
            });

        } else
            return response.status(500).json(err);

    });


});

router.get('/read/:productId', async (request, response, next) => {
    const productId = request.params.productId;
    const query = 'SELECT * FROM products where product_id = ?';
    connection.query(query, [productId], (err, results) => {
        if (!err) {
            return response.status(200).json(results);
        } else {
            return response.status(500).json(err);
        }
    });


});

// Update the products
router.patch('/update/:productId', (request, response, next) => {
    const productId = request.params.productId;
    const product = request.body;
    const query = "update products set product_name = ?, description = ?, price = ?, weigth = ? where product_id = ?";
    connection.query(query, [product.product_name, product.description, product.price, product.weigth, productId], (err, result) => {
        if (!err) {
            if (result.affectedRows === 0) {
                return response.status(404).json({
                    message: "Product ID not found"
                });
            }
            response.status(200).json({
                message: "Product updated successfully"
            });
        }

    });

});

router.delete('/delete/:productId', async (request, response, next) => {
    const productId = request.params.productId;
    const query = 'DELETE FROM products where product_id = ?';
    connection.query(query, [productId], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return response.status(404).json({
                    message: "Product ID not found"
                });
            }
            response.status(200).json({
                message: "Product deleted successfully"
            });
        }

    });

});



module.exports = router;
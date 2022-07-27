const express = require('express');
const router = express.Router();
const connection = require('../../config/dbconnection');

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Get Order'
    });
});

router.post('/create', (request, response, next) => {

    const order = request.body;

    const query = "insert into orders (productID,quantity) values (?, ?)";
    connection.query(query, [order.productID, order.quantity], (err, result) => {
        if (!err) {
            response.status(201).json({
                message: "Order created successfully"
            });

        } else
            return response.status(500).json(err);

    });
});

router.get('/:orderId', (request, response, next) => {
    response.status(201).json({
        message: 'Getting one Order',
        id: request.params.orderId
    });
});

router.patch('/:orderId', (request, response, next) => {
    response.status(200).json({
        message: 'Order Updated',
        id: request.params.orderId
    });
});

router.delete('/:orderId', (request, response, next) => {
    response.status(200).json({
        message: 'Order Deleted',
        id: request.params.orderId
    });
});

module.exports = router;

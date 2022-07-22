const express = require('express');
const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Get Order'
    });
});

router.post('/', (request, response, next) => {
    const order = {
        productId: request.body.productId,
        quantity: request.body.quantity

    }
    response.status(201).json({
        message: 'Create Order',
        orderCreated: order
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

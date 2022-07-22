const express = require('express');


const router = express.Router();

router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET requests for /products'
    });

});

router.post('/', (request, response, next) => {
    const product = {
        name: request.body.name,
        price: request.body.price,
        description: request.body.description,
        type: request.body.type

    }
    response.status(201).json({
        message: 'Handling POST requests for /products',
        createdProduct: product

    });

});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    if (id === 'item1') {
        response.status(200).json({
            message: "This is the of the Fiirst item in Product list",
            id: id
        })

    } else {
        response.status(200).json({
            message: "The id does not exist in the Product list",
        });


    }
});

router.patch('/:productId', (request, response, next) => {
    response.status(201).json({
        message: 'Updated Product'
    });

});

router.delete('/:productId', (request, response, next) => {
    response.status(200).json({
        message: 'Delete Product'
    });

});



module.exports = router;
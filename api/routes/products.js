const express = require('express');
const shopDB = require('../../config/dbconnection');


const router = express.Router();

router.get('/', async (request, response, next) => {
    try {
        let result = await shopDB.all();
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500).json({});
    }

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

router.get('/:productId', async (request, response, next) => {
    // const id = request.params.productId;
    try {

        let result = await shopDB.one(request.params.productId)
        if (result) {
            response.json(result);
        } else {
            response.status(404).json({
                message: 'Product not found'
            });
        }

    } catch (error) {
        console.log(error);
        response.status(500).json({});
    }

});

router.patch('/:productId', (request, response, next) => {
    response.status(201).json({
        message: 'Updated Product'
    });

});

router.delete('/:productId', async (request, response, next) => {
    try {

        let result = await shopDB.delete(request.params.productId)
        if (result) {
            response.json(result);
        } else {
            response.status(404).json({
                message: 'Product not found'
            });
        }

    } catch (error) {
        console.log(error);
        response.status(500).json({});
    }

});



module.exports = router;
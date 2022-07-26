const express = require('express');
const shopDB = require('../../config/dbConnection');
// const mongoose = require('mongoose');


const router = express.Router();

// const Product = require('../models/products');

router.get('/', async (request, response, next) => {
    try {
        let result = await shopDB.all();
        response.json(result);
    } catch (error) {
        console.log(error);
        response.sendStatus(500);
    }

});

router.post('/', (request, response, next) => {

    // const product = new Product({
    //     _id: new mongoose.Types.ObjectId(),
    //     name: request.body.name,
    //     price: request.body.price,
    //     description: request.body.description,
    //     weigth: request.body.type
    // });
    // product.save().then(result => {
    //     console.log(result);
    // })
    //     .catch(err => console.log((err)));

    response.status(201).json({
        message: 'Handling POST requests for /products',
        createdProduct: product

    });

});

router.get('/:productId', async (request, response, next) => {

    try {
        let result = await shopDB.one(request.params.productId);
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(500)
    }

    // const id = request.params.productId;
    // if (id === 'item1') {
    //     response.status(200).json({
    //         message: "This is the of the Fiirst item in Product list",
    //         id: id
    //     })

    // } else {
    //     response.status(200).json({
    //         message: "The id does not exist in the Product list",
    //     });


    // }
});

router.patch('/:productId', (request, response, next) => {
    response.status(201).json({
        message: 'Updated Product'
    });

});

router.delete('/:productId', async (request, response, next) => {
    try {
        let result = await shopDB.one(request.params.productId);
        response.json(result);
    } catch (error) {
        console.log(error);
        response.status(200).json({
            message: "The product with product_id has been deleted from Product list " + request.params.productId
        });
    }

});



module.exports = router;
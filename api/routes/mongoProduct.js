const express = require('express');
const mongoose = require('mongoose');


const router = express.Router();

const Product = require("../models/products");


router.get('/', (request, response, next) => {
    response.status(200).json({
        message: 'Handling GET requests for Mongo products'
    });

});

router.post('/', (request, response, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: request.body.name,
        price: request.body.price,
        description: request.body.description,
        type: request.body.type

    });
    product
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));

    response.status(201).json({
        message: 'Handling POST requests for /products',
        createdProduct: product

    });

});

router.get('/:productId', (request, response, next) => {
    const id = request.params.productId;
    Product.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            response.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({ error: err });
        });

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
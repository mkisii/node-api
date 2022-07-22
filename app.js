const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const productsRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
    'mongodb+srv://ondimu:' +
    process.env.MONGO_ATLS_PWD +
    '@node-api-test.cjek4.mongodb.net/?retryWrites=true&w=majority',
    {
        useMongoClient: true,
    }
);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app, use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});

    }
    next();
});

// Middleware of handling the routes of products
app.use('/products', productsRoutes);
app.use('/orders', orderRoutes);

// Hadling the error of the routes of products
app.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);

});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        error: {
            message: error.message

        }
    });
});


module.exports = app;
const mongoose = require('mongoose');

const productChema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    weigth: String

});

module.exports = mongoose.model('Product', productChema);
const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true }, () => console.log("Connected to MongoDB")
);


exports.mongoose = mongoose;
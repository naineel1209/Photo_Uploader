const mongoose = require('mongoose');

const connectDB = (url) => {
    try {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, () => {
            console.log("Connected to Mongo DB")
        })
        mongoose.set('strictQuery', false);
    } catch (err) {
        console.log("Error connecting to Mongo", err.message);
    }

    return;
};

module.exports = connectDB;
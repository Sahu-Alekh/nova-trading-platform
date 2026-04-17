const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    // Reference to the User who placed the order
    username: String,
    name: String,
    qty: Number,
    price: Number,
    mode: String,
}, { timestamps: true }); // Adding timestamps is a good practice for orders

module.exports = { OrderSchema };
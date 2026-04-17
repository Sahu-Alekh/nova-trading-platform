const { Schema, model } = require('mongoose');

const SellOrderSchema = new Schema({
    // Reference to the User who placed the order
    username: String,
    name: String,
    qty: Number,
    price: Number,
    CurrentPrice: Number,
    mode: String,
}, { timestamps: true }); // Adding timestamps is a good practice for orders

module.exports = { SellOrderSchema };
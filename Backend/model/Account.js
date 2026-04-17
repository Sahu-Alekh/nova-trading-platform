const { Schema, model } = require('mongoose');

const AccountSchema = new Schema({
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    card: { type: String, required: true },
    username: { type: String, required: true, unique: true },
}, { timestamps: true });

module.exports = model('account', AccountSchema);
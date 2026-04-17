const { model } = require('mongoose');

const {SellOrderSchema} = require('../schemas/SellOrderSchema');

const SellOrderModel = new model("sellorder", SellOrderSchema);

module.exports = {SellOrderModel};
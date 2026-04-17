const { model, Schema } = require("mongoose");

const FundsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Each user should only have one funds record
    },
    availableMargin: {
        type: Number,
        default: 0,
    },
    usedMargin: {
        type: Number,
        default: 0,
    },
    availableCash: {
        type: Number,
        default: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const FundsModel = model("fund", FundsSchema);

module.exports = { FundsModel };
const { FundsModel } = require('../model/FundsModel.js');

module.exports.getFunds = async (req, res) => {
    const { username } = req.query;
    try {
        let funds = await FundsModel.findOne({ username: username });
        if (!funds) {
            return res.status(404).json({ message: "Funds record not found" });
        }
        res.status(200).json(funds);
    } catch (err) {
        res.status(500).json({ message: "Error fetching funds" });
    }
};

module.exports.addFunds = async (req, res) => {
    const { username, amount } = req.body;

    if (!amount || amount <= 0) {
        return res.status(400).send("Invalid amount");
    }

    try {
        // Use $inc to add the amount to both availableMargin and availableCash
        const updatedFunds = await FundsModel.findOneAndUpdate(
            { username: username },
            { $inc: { availableMargin: amount, availableCash: amount } },
            { new: true, upsert: true } // Create if doesn't exist
        );

        res.status(200).json(updatedFunds);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating funds");
    }
};

module.exports.WithdrawFunds = async (req, res) => {
    const { username, amount } = req.body;
    try {
        const funds = await FundsModel.findOne({ username });
        if (!funds || funds.availableCash < amount) {
            return res.status(400).send("Insufficient funds for withdrawal");
        }

        const updatedFunds = await FundsModel.findOneAndUpdate(
            { username },
            { $inc: { availableMargin: -amount, availableCash: -amount } },
            { new: true }
        );
        res.status(200).json(updatedFunds);
    } catch (err) {
        res.status(500).send("Error processing withdrawal");
    }
}


//this is not used yet
module.exports.initFunds = async (req, res) => {
    const { username } = req.body;
    try {
        const newFund = new FundsModel({
            username: username,
            availableMargin: 100000, // Giving 1 Lakh dummy cash for testing
            usedMargin: 0,
            availableCash: 100000,
        });
        await newFund.save();
        res.status(201).send("Funds initialized");
    } catch (err) {
        res.status(500).send("Error initializing funds");
    }
}
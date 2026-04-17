require('dotenv').config();

const { OrderModel } = require('../model/OrderModel.js');
const { FundsModel } = require('../model/FundsModel.js');
const { SellOrderModel } = require('../model/SellOrderModel.js');
const Account  = require('../model/Account.js');
const axios = require('axios');
const { model } = require('mongoose');

module.exports.watchlist = async (req, res) => {

    const symbolsString = req.query.symbols;

    if (!symbolsString) {
        return res.status(400).json({ error: "No symbols provided." });
    }

    // 2. Convert the string into an array: ['AAPL', 'MSFT', 'TSLA']
    const symbols = symbolsString.split(',');
    const apiKey = process.env.FINN_TOKEN_KEY;
    const results = {};

    try {
        // 3. Fire off all the Axios requests to Finnhub at the exact same time
        const fetchPromises = symbols.map(async (symbol) => {
            const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`;

            // Axios makes the request and automatically parses the JSON
            const response = await axios.get(url);

            // Finnhub's current price is the "c" property. Map it to the symbol name.
            results[symbol] = response.data;
        });

        // 4. Wait for all requests to finish
        await Promise.all(fetchPromises);

        // 5. Send the neat { AAPL: 150.25, MSFT: 310.10 } object back to React
        res.json(results);

    } catch (error) {
        console.error("Failed fetching batch data:", error.message);
        res.status(500).json({ error: "Failed fetching batch data from Finnhub" });
    }
};

module.exports.getholdings = async (req, res) => {
    const { username } = req.query;
    let allOrders = await OrderModel.find({ username: username, mode: "BUY" });

    const CombinedHoldings = allOrders.map(async (order) => {
        try {
            const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${order.name}&token=${process.env.FINN_TOKEN_KEY}`);
            const currentPrice = response.data;

            const qty = order.qty;
            const avg = order.price;
            const ltp = currentPrice.c;
            const dayChangePerShare = currentPrice.d;
            const dayChangePercent = currentPrice.dp;

            const CurrVal = ltp * qty;
            const InvestedVal = avg * qty;
            const pnl = CurrVal - InvestedVal;
            const netChangePercent = ((ltp - avg) / avg) * 100;
            const TotalDayChange = dayChangePerShare * qty;

            return {
                instrument: order.name,
                qty: qty,
                avg: avg.toFixed(2),
                ltp: ltp.toFixed(2),
                CurrVal: CurrVal.toFixed(2),
                pnl: pnl.toFixed(2),
                netChange: netChangePercent.toFixed(2),
                dayChg: TotalDayChange.toFixed(2),
                dayChgPercent: dayChangePercent.toFixed(2),
                ispnlProfit: pnl >= 0,
                isDayProfit: TotalDayChange >= 0
            }
        } catch (err) {
            console.log("Error fetching holdings:", err);
            return {
                instrument: order.name,
                qty: order.qty,
                avg: order.price.toFixed(2),
                error: "Live data unavailable"
            }
        }
    });

    const allHoldings = await Promise.all(CombinedHoldings);
    res.json(allHoldings);
};

module.exports.getPositions = async (req, res) => {
    const { username } = req.query;
    let allOrders = await OrderModel.find({ username: username, mode: "BUY" });

    const CombinedPositions = allOrders.map(async (order) => {
        try {
            const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${order.name}&token=${process.env.FINN_TOKEN_KEY}`);
            const currentPrice = response.data;

            const qty = order.qty;
            const avg = order.price;
            const ltp = currentPrice.c;
            const dayChangePerShare = currentPrice.d;
            const dayChangePercent = currentPrice.dp;

            const CurrVal = ltp * qty;
            const InvestedVal = avg * qty;
            const pnl = CurrVal - InvestedVal;
            const netChangePercent = ((ltp - avg) / avg) * 100;
            const TotalDayChange = dayChangePerShare * qty;

            return {
                instrument: order.name,
                qty: qty,
                avg: avg.toFixed(2),
                ltp: ltp.toFixed(2),
                CurrVal: CurrVal.toFixed(2),
                pnl: pnl.toFixed(2),
                netChange: netChangePercent.toFixed(2),
                dayChg: TotalDayChange.toFixed(2),
                dayChgPercent: dayChangePercent.toFixed(2),
                ispnlProfit: pnl >= 0,
                isDayProfit: TotalDayChange >= 0
            }
        } catch (err) {
            console.log("Error fetching holdings:", err);
            return {
                instrument: order.name,
                qty: order.qty,
                avg: order.price.toFixed(2),
                error: "Live data unavailable"
            }
        }
    });

    const allHoldings = await Promise.all(CombinedPositions);
    res.json(allHoldings);
};

module.exports.getorders = async (req, res) => {
    const { username } = req.query;
    let allOrders = await OrderModel.find({ username: username });
    res.send(allOrders);
};

module.exports.getSellOrders = async (req, res) => {
    const { username } = req.query;
    let sellOrders = await SellOrderModel.find({ username: username });
    res.send(sellOrders);
};

module.exports.newOrder = async (req, res) => {
    const { username } = req.query;
    const { name, qty, price, mode } = req.body;

    // 1. Calculate the total transaction value
    const totalCost = qty * price;

    try {
        // 2. Fetch user's current funds
        const userFunds = await FundsModel.findOne({ username: username });

        // 3. Validation: Check if user exists and has enough margin
        if (!userFunds) {
            return res.status(404).json({ message: "User funds not found" });
        }

        if (userFunds.availableMargin < totalCost) {
            return res.status(400).json({ message: "Insufficient Margin! Please add funds." });
        }

        // 4. Create and Save the Order
        let newOrder = new OrderModel({
            username: username,
            name: name,
            qty: qty,
            price: price,
            mode: mode,
        });

        await newOrder.save();

        // 5. Update Funds: Deduct from availableMargin/Cash and increase usedMargin
        await FundsModel.findOneAndUpdate(
            { username: username },
            {
                $inc: {
                    availableMargin: -totalCost,
                    availableCash: -totalCost,
                    usedMargin: totalCost
                }
            }
        );

        res.status(201).json({ message: "Order placed successfully and funds updated!" });

    } catch (err) {
        console.error("Order Error:", err);
        res.status(500).json({ message: "Error processing your order" });
    }
};

module.exports.sellorder = async (req, res) => {
    const { username, name, price } = req.body;

    try {
        // 1. Find the BUY order to get details (Quantity and Purchase Price)
        const buyOrder = await OrderModel.findOne({ username, name, mode: "BUY" });

        if (!buyOrder) {
            return res.status(404).json({
                message: "Stock not found in your orders. Please purchase it first."
            });
        }

        const saleValue = buyOrder.price * buyOrder.qty;
        const currentValue = price * buyOrder.qty;

        // 2. CREATE the new SELL order record for history
        const sellOrder = new SellOrderModel({
            username: username,
            name: name,
            qty: buyOrder.qty,
            price: buyOrder.price,
            CurrentPrice: price,
            mode: "SELL",
        });
        await sellOrder.save();

        // 3. DELETE the original BUY order
        // This removes it from the "Buy" list but the "Sell" record remains
        await OrderModel.findByIdAndDelete(buyOrder._id);

        // 4. Update Funds: 
        await FundsModel.findOneAndUpdate(
            { username },
            {
                $inc: {
                    availableMargin: currentValue,
                    availableCash: currentValue,
                    usedMargin: -currentValue
                }
            }
        );

        res.status(200).json({
            message: `Sold ${name} successfully! Buy order cleared, transaction saved to history.`
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error processing sell order");
    }
};

module.exports.findAccount = async (req, res) => {
    const { username } = req.query;
    try {
        const account = await Account.findOne({ username: username });
        if (!account) {
            return res.status(404).json();
        }
        res.status(200).json(account);
    } catch (err) {
        res.status(500).json({ message: "Error fetching account details" });
    }   
};

module.exports.newAccount = async (req, res) => {   
    const { username, accountName, accountNumber, card } = req.body;
    try {
        const existingAccount = await Account.findOne({ username: username });
        if (existingAccount) {
            return res.status(400).json({ message: "Account already exists for this user" });
        }   
        const newAccount = new Account({
            username,
            accountName,
            accountNumber,
            card
        });
        await newAccount.save();
        res.status(201).json({ message: "Account created successfully", account: newAccount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating account" });
    }
};
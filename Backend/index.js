require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authroute = require('./Routes/AuthRoute.js');


const PORT = process.env.PORT || 3003;
const uri = process.env.MONGO_URL;

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    cors({
        // Add your deployed URLs to this list
        origin: [
            "http://localhost:3000", 
            "http://localhost:5173", 
            "https://nova-frontend-opym.onrender.com", 
            "https://nova-dashboard-ttrl.onrender.com"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use("/", authroute);


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        await mongoose.connect(uri);
        console.log('✅ Successfully connected to MongoDB');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        // This will tell you if it's an "Authentication Failed" or "IP not whitelisted" error
    }
});

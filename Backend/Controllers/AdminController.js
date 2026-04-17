const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');
const User  = require('../model/UserModel');
const { OrderModel } = require('../model/OrderModel.js');

module.exports.fetchOrders = async (req, res) => {
    let allOrders = await OrderModel.find({});
    res.send(allOrders);
}

module.exports.Findusers = async (req, res) => {
    let allUsers = await User.find({});
    res.send(allUsers);
}

module.exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email); // DEBUG 1

        // 1. Find user by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            console.log("User not found in DB"); // DEBUG 2
            return res.status(401).json({ message: "Invalid email or password." });
        }

        console.log("Hashed password in DB:", admin.password); // DEBUG 3

        // 2. Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        console.log("Bcrypt Match Result:", isMatch); // DEBUG 4

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // 3. Create a JWT Token (Optional but recommended)
        // For now, we'll send a success message and user info
        const token = jwt.sign({ id: admin._id }, 'YOUR_SECRET_KEY', { expiresIn: '1d' });

        res.status(200).json({
            message: "Login successful",
            token,
            username: admin.username
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


module.exports.createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email or username already exists." });
        }

        // 2. Hash the password (Security First!)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and Save
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully!" });

    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
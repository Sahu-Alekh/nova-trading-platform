const User = require("../model/UserModel");
const { createSecretToken } = require("../util/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Singup = async (req, res, next) => {
    try {
        // console.log("Headers:", req.headers);
        // console.log("Body:", req.body);
        const { email, password, username, createAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ message: "User already exists" });
        }

        const user = await User.create({ email, password, username, createAt });
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res
            .status(201)
            .json({ message: "User created successfully", success: true, user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        next(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "User not found" });
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return res.json({ message: "Invalid credentials" });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true,
        });
        res.status(200)
            .json({
                message: "Login successful", success: true, user: {
                    username: user.username,
                    email: user.email
                }
            });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        next(error);
    }
}
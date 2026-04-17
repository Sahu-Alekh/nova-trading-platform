const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const Userschema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Please enter an email"],
        unique : true,
    },
    username : {
        type : String,
        required : [true, "Please enter a username"],
    },
    password : {
        type : String,
        required : [true, "Please enter a password"],
    },
    createdAt : {
        type : Date,
        default : new Date(),
    },
});

Userschema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", Userschema);
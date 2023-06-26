const mongoose = require("mongoose");
const validator = require("validator");
const { body } = require("express-validator");

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    mobileNo: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!body('password').isLength({ min: 8 })) {
                throw new Error("Your password must be at least 8 characters including a lowercase letter, an uppercase letter, and a number");
            }
        }
    },

}, { timestamps: true })

const User = mongoose.model("User", userModel);
module.exports = User
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const generateToken = require('../config/generateToken');
const bcrypt = require("bcryptjs");

const userLogin = asyncHandler(async(req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please provide credentials");
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),

        })
    } else {
        res.status(400);
        throw new Error("Invalid email or password");
    }


})

module.exports = { userLogin }
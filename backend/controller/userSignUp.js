const asynchandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");

const userSignUp = asynchandler(async(req, res) => {

    const { username, email, mobileNo, password } = req.body;

    if (!username || !email || !mobileNo || !password) {
        res.status(400);
        throw new Error("Please provide the credentials");
    }

    const userAlreadyExist = await User.findOne({ email, username });

    if (userAlreadyExist) {
        return res.status(400).json({ error: "User Already Exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        password: hash,
    })

    const user = await newUser.save();

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            mobileNo: user.mobileNo,
            token: generateToken(user._id),
        })
    } else {

        res.status(400);
        throw new Error("User Not Created");
    }
})

module.exports = { userSignUp };
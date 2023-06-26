const express = require('express');
const router = express.Router();
const { userSignUp } = require("../controller/userSignUp");
const { userLogin } = require("../controller/userLogin");
const { protect } = require("../middleware/authMiddleWare");

router.route("/signup").post(userSignUp);
router.route("/login").post(protect, userLogin);



module.exports = router;
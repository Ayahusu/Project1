const express = require("express");
const limiter = require("../middleware/rateLimiter");
const { body } = require("express-validator")
const handleSignup = require("../controllers/handleSignUp");

const router = express.Router();

router.post("/",
    limiter,
    [
        body("username").isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
    ],
    handleSignup)

module.exports = router


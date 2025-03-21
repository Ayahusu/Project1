const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authControllers");

const router = express.Router();

// For registerUser
router.post("/signin",
    [
        body("username")
            .notEmpty().withMessage("username is required")
            .isLength({ min: 3 }).withMessage("Username must be at least 3 character long")
            .trim(),
        body("email")
            .notEmpty().withMessage("Email is required")
            .isEmail()
            .trim(),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 6 }).withMessage("Password must be at least 6 character long")
            .trim(),
    ],
    registerUser
)

// For loginUser
router.post("/login",
    [
        body("email")
            .notEmpty().withMessage("Email is required")
            .trim(),
        body("password")
            .notEmpty().withMessage("Password is required")
    ], loginUser
)

module.exports = router
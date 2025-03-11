const express = require("express")
const handleSignup = require("../../controllers/userControllers/handleSignUp");
const { body } = require("express-validator");
const validation = require("../../middleware/userInputValidation")

const router = express.Router();

router.post("/signup",
    [
        body("username")
            .notEmpty()
            .isLength({ min: 3 })
            .withMessage("Username must be at least 3 characters")
            .matches(/^[a-zA-Z0-9]+$/).withMessage("Username can only contain alphanumeric characters"),
        body("email")
            .isEmail()
            .notEmpty()
            .withMessage("Invalid email format"),
        body("password")
            .notEmpty()
            .isLength({ min: 6 })
            .withMessage("Password must ne 6 characters long")
    ],
    validation,
    handleSignup
);

module.exports = router;
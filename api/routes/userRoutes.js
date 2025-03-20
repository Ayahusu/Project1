const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser, handleDeleteAccount, handleUpdate } = require("../controllers/usersController");
const User = require("../models/userModel")

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

router.get('/profile/:id', async (req, res) => {
    const id = req.params.id; // Corrected to match :id from the URL
    try {
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.delete("/deleteAccount", handleDeleteAccount)

router.put("/update", handleUpdate)

module.exports = router
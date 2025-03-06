const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");
const User = require("../model/userModel");

const handleSignup = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All credintail are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const newUser = await User.create({ username, email, password });

        const token = jwt.sign(
            { id: newUser._id, username: username, email: email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        if (!newUser) {
            return res.status(201).json({ message: "New User added", token })
        }
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Something went wrong. Please try again." });
    }

}

module.exports = handleSignup;
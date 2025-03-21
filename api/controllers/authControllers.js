const { validationResult } = require("express-validator");
const userSchema = require("../models/userModel");

async function registerUser(req, res) {
    const errors = validationResult(req); // Validate the request body
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        // Check if the user already exists based on email
        const userExists = await userSchema.findOne({ email });
        if (userExists) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Create the new user
        const user = await userSchema.create({
            username,
            email,
            password
        });

        // If user creation failed
        if (!user) {
            return res.status(500).json({ message: "User creation failed" });
        }

        // Generate the JWT token for the user
        const token = await user.genAuthToken();

        // Send the token in the response (no sensitive user data)
        res.status(200).json({ token });

    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    try {
        const { email, password } = req.body;

        const user = await userSchema.findOne({ email }).select("+password")
        if (!user) {
            return res.status(401).json({ message: "Email or Password is Invalid" })
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Email or Password is Invalid" })
        }

        // Generate the JWT token for the user
        const token = await user.genAuthToken();

        // Send the token in the response (no sensitive user data)
        res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}


module.exports = { registerUser, loginUser }
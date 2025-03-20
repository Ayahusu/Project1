const { validationResult } = require("express-validator");
const userSchema = require("../models/userModel");

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        console.log(req.body);
        const { username, email, password } = req.body;

        // Check if user already exists
        const userExists = await userSchema.findOne({ email });
        if (userExists) {
            return res.status(401).json({ message: "User already exists" });
        }

        // Create user
        const user = await userSchema.create({
            username,
            email,
            password
        });

        // Generate authentication token
        const token = await user.genAuthToken();

        res.status(200).json({ user, token });
    } catch (error) {
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

        const token = await user.genAuthToken();
        res.status(200).json({ token, user })
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

const handleUpdate = async (req, res) => {

    const { username, newUsername, email } = req.body;

    try {
        const response = await userSchema.findOneAndUpdate(
            { username },   // Filter: Find user by username
            { username: newUsername, email },  // Update fields
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Updated Successfully", user: response });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const handleDeleteAccount = async (req, res) => {
    const { email } = req.body;

    try {
        const response = await userSchema.findOneAndDelete({ email });

        if (!response) {
            return res.status(404).json({ message: "User not found" }); // ✅ If no user found, return 404
        }

        res.status(200).json({ message: "Account Deleted Successfully" }); // ✅ Return success message if deleted
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message }); // ✅ Fixed status code typo
    }
};

module.exports = {
    registerUser,
    loginUser,
    handleDeleteAccount,
    handleUpdate
};

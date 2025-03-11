const jwt = require("jsonwebtoken")
const User = require("../../model/userModel");
const { createUser } = require("../../services/userServices.js/create");

const handleSignup = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const userExits = await User.findOne({ email });

        if (userExits) {
            return res.status(401).json({ message: "User already exits" })
        }

        const user = await createUser({ username, email, password });

        const token = user.generateAuthToken();

        return res.status(200).json({ token, user })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports = handleSignup;
const jwt = require("jsonwebtoken");
const User = require("../../model/userModel")

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ message: "Rrequired all field" })
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email does't exits" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY, { expiresIn: "24h" })

        res.status(200).json({
            message: "Login Successfull",
            token,
            redirect: "/home"
        });

    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    handleLogin
}
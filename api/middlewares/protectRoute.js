const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log("Authorization Header:", authHeader);  // Debugging log

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1];
        // console.log("Extracted Token:", token);  // Debugging log

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // console.log("Decoded Token:", decoded);  // Debugging log

        if (!decoded || !decoded._id) {  // Ensure `_id` exists in payload
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // Attach user info to request
        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        // console.log("Authenticated User:", user);  // Debugging log
        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);  // Debugging log
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = protectRoute;

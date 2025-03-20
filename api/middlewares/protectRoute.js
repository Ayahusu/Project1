const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("Authorization Header:", authHeader);  // Log the header to check the token
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log decoded token for debugging

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        // Attach user info to request
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found" });
        }

        req.user = user; // Attach the user object to req
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
};

module.exports = protectRoute;

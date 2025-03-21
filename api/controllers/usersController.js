const User = require("../models/userModel");

const handleGetUserProfile = async (req, res) => {

    const userId = req.user._id;

    try {
        const user = await User.findOne({ _id: userId }).select("-password").populate("posts")
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Not Found" });
    }
}

const handleGetUserProfileById = async (req, res) => {

    const profileId = req.params.id;
    try {
        const user = await User.findOne({ _id: profileId }).select("-password").populate("posts")
        if (!user) {
            return res.status(404).json({ message: "User not Found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: "Server Not Found" });
    }
}

const handleDeleteAccount = async (req, res) => {
    const { email } = req.body;

    try {
        const response = await User.findOneAndDelete({ email });

        if (!response) {
            return res.status(404).json({ message: "User not found" }); // ✅ If no user found, return 404
        }

        res.status(200).json({ message: "Account Deleted Successfully" }); // ✅ Return success message if deleted
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message }); // ✅ Fixed status code typo
    }
};

module.exports = {
    handleGetUserProfile,
    handleGetUserProfileById,
    handleDeleteAccount,
};

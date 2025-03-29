const User = require("../models/User");

// Send Friend Request
const sendFriendRequest = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const receiver = await User.findById(receiverId);

        if (!receiver) return res.status(404).json({ message: "User not found" });
        if (receiver.friendRequests.includes(senderId))
            return res.status(400).json({ message: "Request already sent" });

        receiver.friendRequests.push(senderId);
        await receiver.save();

        res.status(200).json({ message: "Friend request sent" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Accept Friend Request
const acceptFriendRequest = async (req, res) => {
    try {
        const { userId, requestId } = req.body;
        const user = await User.findById(userId);
        const requester = await User.findById(requestId);

        if (!user || !requester) return res.status(404).json({ message: "User not found" });

        user.friends.push(requestId);
        user.friendRequests = user.friendRequests.filter((id) => id.toString() !== requestId);

        requester.friends.push(userId);

        await user.save();
        await requester.save();

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Decline Friend Request
const declineFriendRequest = async (req, res) => {
    try {
        const { userId, requestId } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });

        user.friendRequests = user.friendRequests.filter((id) => id.toString() !== requestId);
        await user.save();

        res.status(200).json({ message: "Friend request declined" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest
}
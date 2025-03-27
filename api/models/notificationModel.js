const mongoose = require("mongoose")

const NotificationSchema = new mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who triggered the notification
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Who receives the notification
        type: { type: String, enum: ["like", "comment", "follow"], required: true }, // Type of notification
        postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: null }, // For likes/comments
        isRead: { type: Boolean, default: false }, // Whether the user has seen the notification
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);

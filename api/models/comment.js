const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    replies: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: String,
            createdAt: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("Comment", CommentSchema);

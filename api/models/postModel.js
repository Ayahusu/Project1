const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Link to Comment model
    },

    { timestamps: true }
);


module.exports = mongoose.model("Post", postSchema)

const Post = require("../models/postModel")

const createPost = async (req, res) => {
    console.log(req.body)
    try {
        const { title, description } = req.body;
        const userId = req.user?._id || req.body.user;

        const post = await Post.create({
            title,
            description,
            user: userId,
        });

        res.status(201).json({ message: "Post created successfully", post });

    } catch (error) {
        console.error("Error in createPost:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const handleDeletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.query.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log(`Post ID: ${postId}, User ID: ${userId}`);

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Compare user._id as strings or ObjectId depending on your model
        if (post.user._id.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        await Post.findByIdAndDelete(postId);
        res.status(204).send(); // No content response after deletion
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error" });
    }
};



const getAllPost = async (req, res) => {
    try {
        const postList = await Post.find()
            .populate('user', 'username')
            .populate('comments.user', 'username profileImg');
        console.log(postList)

        if (!postList || postList.length === 0) {
            return res.status(404).json({ message: "No Posts Found" });
        }

        res.status(200).json(postList);
    } catch (error) {
        console.error("Error in getAllPost:", error);  // ✅ Logs exact issue
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { createPost, handleDeletePost, getAllPost };

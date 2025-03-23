const Post = require("../models/postModel")
const Comment = require("../models/comment")
// const Like = require("../models/like")
const User = require("../models/userModel")

const createPost = async (req, res) => {
    // console.log(req.user)
    try {
        const { title, description } = req.body;
        const author = req.user._id;

        // Create a new post
        const newPost = await Post.create({
            title,
            description,
            author
        });

        // Add the new post's _id to the 'posts' array of the user
        await User.findByIdAndUpdate(
            author,
            { $push: { posts: newPost._id } },  // Push the post's ID to the user's posts array
            { new: true }
        );

        // Respond with the newly created post
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error in createPost:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


const handleDeletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        // console.log("Post Id:", postId)
        // console.log("Post Id:", userId)

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // console.log("Post : ", post)
        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this post" });
        }

        await Post.findByIdAndDelete(postId);
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getAllPost = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const postList = await Post.find()
            .populate('author', 'username')
            .populate('comments.user', 'username profileImg')
            .limit(limit * 1) // Convert string to number
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 }); // Sort by latest posts

        if (!postList.length) {
            return res.status(200).json([]); // Return empty array instead of 404
        }

        res.status(200).json(postList);
    } catch (error) {
        console.error("Error in getAllPost:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


const getPostById = async (req, res) => {

    const id = req.params.userId

    const posts = await Post.find({ id });

    if (!posts) {
        return res.status(404).json({ message: "No post Found" })
    }

    res.status(200).json({ posts })
}

const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id;
        const { id: postId } = req.params;

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const userLikedPost = post.likes.includes(userId);

        if (userLikedPost) {
            // Unlike
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
            await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });
        } else {
            // Like
            post.likes.push(userId);
            await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
            await post.save();
        }

        res.status(200).json(post.likes);
    } catch (error) {
        console.error("Error in likeUnlikePost:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Comment on Post
const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;
        const postId = req.params.id;
        const userId = req.user._id;

        if (!text) return res.status(400).json({ error: "Text is required" });

        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ error: "Post not found" });

        const comment = await Comment.create({ user: userId, post: postId, text });

        post.comments.push({ user: userId, text });
        await post.save();

        res.status(200).json(comment);
    } catch (error) {
        console.error("Error in commentOnPost:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { createPost, handleDeletePost, getAllPost, getPostById, commentOnPost, likeUnlikePost };

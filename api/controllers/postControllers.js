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

const handleUpdatePost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,  // ✅ Corrected from postId to id
            { title, description },
            { new: true } // Return updated post
        );
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: "Error updating post", error });
    }
};



const getAllPost = async (req, res) => {
    try {
        // Destructure and provide default values for pagination
        const { page = 1, limit = 10 } = req.query;

        // Convert page and limit to numbers (default to 10 if invalid input)
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        // Fetch the posts with pagination, population, and sorting
        const postList = await Post.find()
            .populate('author', 'username profileImg')
            .populate('comments.user', 'username profileImg')
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .sort({ createdAt: -1 });

        // If no posts are found, return an empty array
        if (!postList.length) {
            return res.status(200).json([]);
        }

        // Return the posts as JSON response
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

// Comment on Post
const commentOnPost = async (req, res) => {
    try {
        const { comment } = req.body;
        const userId = req.user._id;
        const username = req.user.username;

        if (!comment) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const newComment = new Comment({
            postId: req.params.postId,
            userId,
            username, // Store username
            text: comment,
        });

        await newComment.save();

        // Add the comment ID to the Post's comments array
        await Post.findByIdAndUpdate(req.params.postId, {
            $push: { comments: newComment._id },
        });

        res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Server error" });
    }
}



const likePost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const userId = req.user._id;
        console.log("Post ID:", postId, "User ID:", userId);

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has already liked the post
        if (post.likes.includes(userId)) {
            return res.status(400).json({ message: "Post already liked" });
        }

        // Add user to the likes array
        post.likes.push(userId);
        await post.save();

        res.status(200).json({ message: "Post liked successfully", post });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};


// Unlike a post
const unlikePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user._id;

        console.log("Post ID:", postId, "User ID:", userId);

        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user has actually liked the post
        if (!post.likes.includes(userId)) {
            return res.status(400).json({ message: "You have not liked this post yet." });
        }

        // Remove the user's like
        post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
        await post.save();

        res.status(200).json({ message: "Post unliked successfully", post });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};




module.exports = { createPost, handleDeletePost, handleUpdatePost, getAllPost, getPostById, commentOnPost, likePost, unlikePost };

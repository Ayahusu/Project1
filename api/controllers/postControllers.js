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



// const getAllPost = async (req, res) => {
//     try {
//         // Destructure and provide default values for pagination
//         const { page = 1, limit = 10 } = req.query;

//         // Convert page and limit to numbers (default to 10 if invalid input)
//         const pageNumber = parseInt(page, 10) || 1;
//         const limitNumber = parseInt(limit, 10) || 10;

//         // Fetch the posts with pagination, population, and sorting
//         const postList = await Post.find()
//             .populate("author", "username")
//             .populate({
//                 path: "comments",
//                 populate: [
//                     { path: "userId", select: "username" },
//                     { path: "replies.userId", select: "username" }
//                 ]
//             })
//             .sort({ createdAt: -1 })
//             .skip((pageNumber - 1) * limitNumber)
//             .limit(limitNumber)
//             .exec();

//         // If no posts are found, return an empty array
//         if (!postList.length) {
//             return res.status(200).json([]);
//         }

//         // Return the posts as JSON response
//         res.status(200).json(postList);
//     } catch (error) {
//         console.error("Error in getAllPost:", error);
//         return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// };

const getAllPost = async (req, res) => {
    try {
        // Ensure default values for pagination
        const pageNumber = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limitNumber = Math.max(parseInt(req.query.limit, 10) || 10, 1);

        // Fetch posts with pagination, sorting, and optimized population
        const postList = await Post.find()
            .populate("author", "username")
            .populate({
                path: "comments",
                populate: {
                    path: "userId replies.userId",
                    select: "username"
                }
            })
            .sort({ createdAt: -1 })
            .skip((pageNumber - 1) * limitNumber)
            .limit(limitNumber)
            .exec();

        // Return empty array if no posts found
        res.status(200).json(postList.length ? postList : []);
    } catch (error) {
        console.error("Error in getAllPost:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
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

        if (!comment) {
            return res.status(400).json({ error: "Comment text is required" });
        }

        const newComment = new Comment({
            postId: req.params.postId,
            userId,
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

// const handleReplies = async (req, res) => {
//     try {
//         const userId = req.user._id; // Get the authenticated user
//         const { replyText } = req.body;
//         const { commentId } = req.params;

//         // Find the specific comment
//         const comment = await Comment.findById(commentId);
//         if (!comment) {
//             return res.status(404).json({ message: "Comment not found" });
//         }

//         // Create the new reply object
//         const newReply = {
//             userId: userId, // Replying user
//             text: replyText,
//             createdAt: new Date(),
//         };

//         // Push the reply into the comment's replies array
//         comment.replies.push(newReply);

//         // Save the updated comment
//         await comment.save();

//         res.status(201).json({ message: "Reply added successfully", reply: newReply });
//     } catch (error) {
//         console.error("Error in handleReplies:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const handleReplies = async (req, res) => {
    try {
        const { text } = req.body;
        const { commentId } = req.params;
        const userId = req.user._id;

        // Find the comment
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Create new reply object
        const newReply = { userId, text };

        // Add reply to the comment's replies array
        comment.replies.push(newReply);
        await comment.save();

        // Populate userId to return username
        await comment.populate("replies.userId", "username");

        // Return the last added reply
        res.status(201).json(comment.replies[comment.replies.length - 1]);
    } catch (error) {
        console.error("Error adding reply:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


module.exports = { createPost, handleDeletePost, handleUpdatePost, getAllPost, getPostById, commentOnPost, handleReplies };

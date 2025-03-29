const express = require("express");
const {
    createPost,
    handleDeletePost,
    handleUpdatePost,
    getAllPost,
    getPostById,
    commentOnPost,
    handleReplies
} = require("../controllers/postControllers");
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.delete("/deletePost/:id", protectRoute, handleDeletePost)
router.put("/updatePost/:id", protectRoute, handleUpdatePost)
router.get("/allPosts", protectRoute, getAllPost);
router.get("/getPost/:id", getPostById)
router.post("/comment/:postId", protectRoute, commentOnPost);
router.post("/reply/:commentId", protectRoute, handleReplies);



module.exports = router;

const express = require("express");
const {
    createPost,
    handleDeletePost,
    handleUpdatePost,
    getAllPost,
    getPostById,
    likePost,
    unlikePost,
    commentOnPost
} = require("../controllers/postControllers");

const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.delete("/deletePost/:id", protectRoute, handleDeletePost)
router.put("/updatePost/:id", protectRoute, handleUpdatePost)
router.get("/allPosts", protectRoute, getAllPost);

router.get("/getPost/:id", getPostById)

router.get("/getPost/:id", protectRoute, getPostById)

// router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);

router.post("/like/:postId", protectRoute, likePost);
router.delete("/unlike/:postId", protectRoute, unlikePost);
router.post("/comment/:postId", protectRoute, commentOnPost);


module.exports = router;

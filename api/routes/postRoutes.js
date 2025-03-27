const express = require("express");
<<<<<<< HEAD
<<<<<<< HEAD
const { createPost, handleDeletePost, getAllPost, getPostById } = require("../controllers/postControllers");
=======
const { createPost, handleDeletePost, getAllPost, getPostById, likeUnlikePost, commentOnPost } = require("../controllers/postControllers");
>>>>>>> fe86617 (third commit)
=======
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
>>>>>>> dc509c1 (third commit)
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.delete("/deletePost/:id", protectRoute, handleDeletePost)
router.put("/updatePost/:id", protectRoute, handleUpdatePost)
router.get("/allPosts", protectRoute, getAllPost);
<<<<<<< HEAD
router.get("/getPost/:id", getPostById)
=======
router.get("/getPost/:id", protectRoute, getPostById)
<<<<<<< HEAD
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
>>>>>>> fe86617 (third commit)
=======
router.post("/like/:postId", protectRoute, likePost);
router.delete("/unlike/:postId", protectRoute, unlikePost);
router.post("/comment/:postId", protectRoute, commentOnPost);
>>>>>>> dc509c1 (third commit)

module.exports = router;

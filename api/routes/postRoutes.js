const express = require("express");
<<<<<<< HEAD
const { createPost, handleDeletePost, getAllPost, getPostById } = require("../controllers/postControllers");
=======
const { createPost, handleDeletePost, getAllPost, getPostById, likeUnlikePost, commentOnPost } = require("../controllers/postControllers");
>>>>>>> fe86617 (third commit)
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.delete("/deletePost/:id", protectRoute, handleDeletePost)
router.get("/allPosts", protectRoute, getAllPost);
<<<<<<< HEAD
router.get("/getPost/:id", getPostById)
=======
router.get("/getPost/:id", protectRoute, getPostById)
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
>>>>>>> fe86617 (third commit)

module.exports = router;

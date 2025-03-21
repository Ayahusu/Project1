const express = require("express");
const { createPost, handleDeletePost, getAllPost, getPostById } = require("../controllers/postControllers");
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.delete("/deletePost/:id", protectRoute, handleDeletePost)
router.get("/allPosts", protectRoute, getAllPost);
router.get("/getPost/:id", getPostById)

module.exports = router;

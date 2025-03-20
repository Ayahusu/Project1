const express = require("express");
const { createPost, handleDeletePost, getAllPost } = require("../controllers/postControllers");
const protectRoute = require("../middlewares/protectRoute")

const router = express.Router();

router.post("/create", createPost);
router.delete("/deletepost/:id", handleDeletePost)
router.get("/all", getAllPost);


module.exports = router;

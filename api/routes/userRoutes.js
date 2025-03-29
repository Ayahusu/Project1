const express = require("express");
const protectRoute = require("../middlewares/protectRoute")
const { handleGetUserProfile, handleGetUserProfileById, handleDeleteAccount, getAllFriends } = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", protectRoute, handleGetUserProfile)
router.get("/:userId", protectRoute, handleGetUserProfileById)
router.delete("/deleteAccount", protectRoute, handleDeleteAccount)
router.get("/friends", protectRoute, getAllFriends);

module.exports = router
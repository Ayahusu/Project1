const express = require("express");
const protectRoute = require("../middlewares/protectRoute")
const { handleGetUserProfile, handleGetUserProfileById, handleDeleteAccount } = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", protectRoute, handleGetUserProfile)
router.get("/profile/:id", protectRoute, handleGetUserProfileById)
router.delete("/deleteAccount", protectRoute, handleDeleteAccount)

module.exports = router
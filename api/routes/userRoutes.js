const express = require("express");
const protectRoute = require("../middlewares/protectRoute")
const { handleGetUserProfile, handleGetUserProfileById, handleDeleteAccount } = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", protectRoute, handleGetUserProfile)
router.get("/profile", protectRoute, handleGetUserProfileById)
router.delete("/deleteAccount", handleDeleteAccount)

module.exports = router
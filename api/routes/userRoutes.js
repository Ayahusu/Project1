const express = require("express");
const protectRoute = require("../middlewares/protectRoute")
const { handleGetUserProfile, handleGetUserProfileById, handleDeleteAccount } = require("../controllers/usersController");

const router = express.Router();

router.get("/profile", protectRoute, handleGetUserProfile)
<<<<<<< HEAD
router.get("/profile", protectRoute, handleGetUserProfileById)
router.delete("/deleteAccount", handleDeleteAccount)
=======
router.get("/profile/:id", protectRoute, handleGetUserProfileById)
router.delete("/deleteAccount", protectRoute, handleDeleteAccount)
>>>>>>> fe86617 (third commit)

module.exports = router
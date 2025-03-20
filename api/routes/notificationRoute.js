const express = require("express");
const { protectRoute } = require("../middlewares/protectRoute");
const { getNotifications, deleteNotifications } = require("../controllers/notificationControllers");

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.delete("/", protectRoute, deleteNotifications);

export default router;

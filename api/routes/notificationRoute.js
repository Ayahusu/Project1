const express = require("express");
const protectRoute = require("../middlewares/protectRoute");
const Notification = require("../models/notificationModel");

const router = express.Router();

/**
 * @route   GET /api/notifications
 * @desc    Get user notifications
 * @access  Private
 */
router.get("/", protectRoute, async (req, res) => {
    try {
        const notifications = await Notification.find({ receiver: req.user.id })
            .sort({ createdAt: -1 })
            .populate("sender", "username profileImg")
            .populate("postId", "title");

        res.json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route   POST /api/notifications
 * @desc    Create a new notification
 * @access  Private
 */
router.post("/", protectRoute, async (req, res) => {
    try {
        const { receiver, type, postId } = req.body;

        if (!receiver) {
            return res.status(400).json({ message: "Receiver is required" });
        }

        // Prevent duplicate notifications (e.g., liking multiple times)
        if (type === "like") {
            const existingNotification = await Notification.findOne({
                sender: req.user.id,
                receiver,
                type,
                postId,
            });

            if (existingNotification) {
                return res.status(400).json({ message: "Notification already exists" });
            }
        }

        const newNotification = new Notification({
            sender: req.user.id,
            receiver,
            type,
            postId: postId || null,
        });

        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (error) {
        console.error("Error creating notification:", error);
        res.status(500).json({ message: "Server error" });
    }
});

/**
 * @route   PUT /api/notifications/:id/read
 * @desc    Mark notification as read
 * @access  Private
 */
router.put("/:id/read", protectRoute, async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) return res.status(404).json({ message: "Not found" });

        notification.isRead = true;
        await notification.save();
        res.json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error updating notification:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

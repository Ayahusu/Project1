const express = require("express");
const router = express.Router();
const {
    sendFriendRequest,
    acceptFriendRequest,
    declineFriendRequest,
} = require("../controllers/friendControllers");

router.post("/send", sendFriendRequest);
router.post("/accept", acceptFriendRequest);
router.post("/decline", declineFriendRequest);

module.exports = router;

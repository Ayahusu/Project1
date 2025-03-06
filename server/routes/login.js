const express = require("express");
const { handleLogin } = require("../controllers/handleLogin");

const router = express.Router();


router.post("/", handleLogin);

module.exports = router;
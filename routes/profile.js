// profile.js
var express = require("express");
var router = express.Router();
const profileController = require("../controllers/profileController");
const { authenticateToken } = require("../middleware/middleware");

// Route to get the user profile
router.get("/", authenticateToken, profileController.getUserProfile);

// Route to update the user profile
router.put("/update", authenticateToken, profileController.updateUserProfile);

module.exports = router;

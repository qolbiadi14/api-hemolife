// jadwal.js
var express = require("express");
var router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { authenticateToken } = require("../middleware/middleware");

// Route to get all jadwal data
router.get("/", authenticateToken, dashboardController.getDashboardUser);
router.post(
  "/acceptRequest",
  authenticateToken,
  dashboardController.postAcceptRequest
);
router.post(
  "/rejectRequest",
  authenticateToken,
  dashboardController.postRejectRequest
);

module.exports = router;

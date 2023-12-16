var express = require("express");
var router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { authenticateToken } = require("../middleware/middleware");

router.get("/search", authenticateToken, volunteerController.getVolunteer);
router.post(
  "/request",
  authenticateToken,
  volunteerController.requestVolunteer
);

module.exports = router;

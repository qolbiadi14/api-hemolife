var express = require("express");
var router = express.Router();

const {
	getAllBloodBank,
	getBloodBankByPmiId,
	updateBloodBankByPmiId,
	getAllBloodDonors,
	adminProfile,
	updateAdminProfile,
} = require("../controllers/adminController");
const { authenticateToken } = require("../middleware/middleware");

router.get("/dashboardAdmin", getAllBloodBank);
router.get("/bankDarah/:id", getBloodBankByPmiId);
router.put("/bankDarah/update/:id", updateBloodBankByPmiId);
router.get("/pendonorDarah", getAllBloodDonors);
router.get("/adminProfile", authenticateToken, adminProfile);
router.put("/adminProfile/update", authenticateToken, updateAdminProfile);

module.exports = router;

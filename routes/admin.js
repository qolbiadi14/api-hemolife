var express = require("express");
var router = express.Router();

const {
	getAllBloodBank,
	getBloodBankByPmiId,
	updateBloodBankByPmiId,
	getAllBloodDonors,
} = require("../controllers/adminController");

router.get("/dashboardAdmin", getAllBloodBank);
router.get("/bankDarah/:id", getBloodBankByPmiId);
router.put("/bankDarah/:id", updateBloodBankByPmiId);
router.get("/pendonorDarah", getAllBloodDonors);

module.exports = router;

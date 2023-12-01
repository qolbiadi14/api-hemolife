var express = require("express");
var router = express.Router();

const {
	getAllBloodBank,
	getBloodBankByPmiId,
	updateBloodBankByPmiId,
} = require("../controllers/adminController");

router.get("/dashboardAdmin", getAllBloodBank);
router.get("/bankDarah/:id", getBloodBankByPmiId);
router.put("/bankDarah/:id", updateBloodBankByPmiId);

module.exports = router;

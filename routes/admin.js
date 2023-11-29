var express = require('express');
var router = express.Router();

const {
	getAllBloodBank,
	getBloodBankByPmiLocation,
} = require('../controllers/adminController');

router.get('/dashboardAdmin', getAllBloodBank);
router.get('/bankDarah/:id', getBloodBankByPmiLocation);

module.exports = router;

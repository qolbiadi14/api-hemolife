// jadwal.js
var express = require("express");
var router = express.Router();
const jadwalController = require("../controllers/jadwalController");

// Route to get all jadwal data
router.get("/", jadwalController.getAllJadwal);
router.get("/detail/:id", jadwalController.getAllJadwalById);

module.exports = router;

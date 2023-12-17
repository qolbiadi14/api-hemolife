// jadwal.js
var express = require("express");
var router = express.Router();
const jadwalController = require("../controllers/jadwalController");
const { authenticateToken } = require("../middleware/middleware");

// Route to get all jadwal data
router.get("/", authenticateToken, jadwalController.getAllJadwalPerDay);
router.get("/detail/:id",authenticateToken, jadwalController.getDetailLocationById);
router.post("/daftar",authenticateToken, jadwalController.postJadwalDaftar);
router.post("/cari",authenticateToken, jadwalController.postCariJadwalLokasi);

module.exports = router;

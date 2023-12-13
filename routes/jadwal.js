// jadwal.js
var express = require("express");
var router = express.Router();
const jadwalController = require("../controllers/jadwalController");

// Route to get all jadwal data
router.get("/", jadwalController.getAllJadwalPerDay);
router.get("/detail/:id", jadwalController.getDetailLocationById);
router.post("/daftar", jadwalController.postJadwalDaftar);
router.post("/cari", jadwalController.postCariJadwalLokasi);

module.exports = router;

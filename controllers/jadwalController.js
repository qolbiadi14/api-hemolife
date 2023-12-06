// jadwalController.js
const { Jadwal, BankDarah, GolDarah, LokasiPmi, } = require("../models");

// Controller function to get all jadwal data
exports.getAllJadwal = async (req, res) => {
  try {
    // Fetch all jadwal records from the database
    const jadwalData = await Jadwal.findAll();

    // Send the jadwal data as a response
    res.json({ success: true, data: jadwalData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getAllJadwalById = async (req, res) => {
  try {
    const idLokPmi = req.params.id;
    const jadwalData = await Jadwal.findAll({
      where: { id_lokasi_pmi: idLokPmi },
      include: [
        {
          model: BankDarah,
          attributes: ["jumlah_kantong_darah"],
          include: [
            {
              model: GolDarah,
              attributes: ["gol_darah"],
            },
          ],
        },
        {
          model: LokasiPmi,
          attributes: [
            "id_lokasi_pmi",
            "nama",
            "alamat",
            "no_telpon",
            "email",
            "latitude",
            "longitude",
          ],
        },
      ],
    });

    const transformedData = jadwalData.map((jadwal) => {
      return {
        id_lok_pmi: jadwal.LokasiPmi.id_lokasi_pmi,
        jumlah_kantong_darah: jadwal.BankDarah.jumlah_kantong_darah,
        nama_lok_pmi: jadwal.LokasiPmi.nama,
        alamat_pmi: jadwal.LokasiPmi.alamat,
        no_telpon_pmi: jadwal.LokasiPmi.no_telpon,
        email_pmi: jadwal.LokasiPmi.email,
        latitude: jadwal.LokasiPmi.latitude,
        longitude: jadwal.LokasiPmi.longitude,
      };
    });

    res.json({ success: true, data: transformedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// jadwalController.js
const { Jadwal, BankDarah, GolDarah, LokasiPmi, TraDonor, User} = require("../models");

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

exports.postJadwalDaftar = async (req, res) => {
  try {
    const { id_user, id_lokasi_pmi, id_gol_darah, tgl_donor } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { id_user } });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User tidak ditemukan" });
    }

    // Check if the provided gol_darah exists
    const golDarah = await GolDarah.findOne({ where: { id_gol_darah } });
    if (!golDarah) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid gol_darah" });
    }

    // Check if the provided lokasi_pmi exists
    const lokasiPmi = await LokasiPmi.findOne({ where: { id_lokasi_pmi } });
    if (!lokasiPmi) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid lokasi_pmi" });
    }

    // Perform the donor registration
    const newDonorRegistration = await TraDonor.create({
      id_user,
      id_gol_darah,
      id_lokasi_pmi,
      tgl_donor,
      status: 1, // 1 Register
    });

    res.json({
      success: true,
      data: {
        id_pendonor: newDonorRegistration.id_tra_donor,
        status_donor: newDonorRegistration.status,
        gol_darah: golDarah.gol_darah,
        lokasi_pmi: lokasiPmi.nama, // Change this based on your requirement
        tanggal_donor: newDonorRegistration.tgl_donor,
        message: "Donor registration successful",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

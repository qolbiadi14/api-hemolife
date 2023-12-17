// jadwalController.js
const {
  Jadwal,
  BankDarah,
  GolDarah,
  LokasiPmi,
  TraDonor,
  User,
  sequelize,
  Sequelize,
} = require("../models");

// Controller function to get all jadwal data
exports.getAllJadwalPerDay = async (req, res) => {
  try {
    const d = new Date();
    let getday = d.getDay();

    let hari = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];

    // Fetch jadwal records for the specified day from the database
    const jadwalData = await Jadwal.findAll({
      where: {
        jadwal_hari: hari[getday],
      },
      include: [
        {
          model: LokasiPmi,
          attributes: [
            "id_lokasi_pmi",
            "nama",
            "alamat",
            "latitude",
            "longitude",
          ],
        },
      ],
    });

    // Format the response
    const formattedData = jadwalData.map((jadwal) => ({
      id_lok_pmi: jadwal.LokasiPmi.id_lokasi_pmi,
      nama_lok_pmi: jadwal.LokasiPmi.nama,
      alamat_pmi: jadwal.LokasiPmi.alamat,
      jadwal_jam_mulai: jadwal.jadwal_jam_mulai,
      jadwal_jam_selesai: jadwal.jadwal_jam_selesai,
      latitude: jadwal.LokasiPmi.latitude,
      longitude: jadwal.LokasiPmi.longitude,
    }));

    // Send the formatted jadwal data as a response
    res.json({ success: true, data: formattedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getDetailLocationById = async (req, res) => {
  try {
    const lokasiPmiData = await LokasiPmi.findOne({
      attributes: [
        "id_lokasi_pmi",
        "nama",
        "no_telpon",
        "alamat",
        "latitude",
        "longitude",
      ],
      where: {
        id_lokasi_pmi: req.params.id,
      },
      include: [
        {
          model: BankDarah,
          attributes: ["jumlah_kantong_darah"],
          include: [
            {
              model: GolDarah,
              attributes: ["id_gol_darah", "gol_darah"],
            },
          ],
        },
      ],
      nest: true, // Add this option to nest the associations
    });

    console.log("lokasiPmiData:", lokasiPmiData);

    if (!lokasiPmiData) {
      return res
        .status(404)
        .json({ success: false, error: "Location not found" });
    }

    const stokDarah = (lokasiPmiData.BankDarahs || []).map((bankDarah) => {
      return {
        id_gol_darah: bankDarah.GolDarah.id_gol_darah,
        gol_darah: bankDarah.GolDarah.gol_darah,
        jumlah_kantong_darah: bankDarah.jumlah_kantong_darah,
      };
    });

    const formattedData = {
      id_lokasi_pmi: lokasiPmiData.id_lokasi_pmi,
      nama: lokasiPmiData.nama,
      no_telpon: lokasiPmiData.no_telpon,
      alamat: lokasiPmiData.alamat,
      latitude: lokasiPmiData.latitude,
      longitude: lokasiPmiData.longitude,
      stok_darah: stokDarah,
    };

    res.json({ success: true, data: formattedData });
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
        lokasi_pmi: lokasiPmi.nama,
        tanggal_donor: newDonorRegistration.tgl_donor,
        message: "Donor registration successful",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.postCariJadwalLokasi = async (req, res) => {
  try {
    const { lokasiQuery } = req.body; // Assuming you send the search query in the request body

    const d = new Date();
    let getday = d.getDay();

    let hari = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];

    // Use Sequelize to find all locations based on the name or address
    const lokasiList = await LokasiPmi.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nama: { [Sequelize.Op.like]: `%${lokasiQuery}%` } }, // Case-insensitive search for name
          { alamat: { [Sequelize.Op.like]: `%${lokasiQuery}%` } }, // Case-insensitive search for address
        ],
      },
    });

    if (!lokasiList || lokasiList.length === 0) {
      return res.status(404).json({ message: "Locations not found" });
    }

    // Iterate through the list of locations and find the associated schedules (Jadwal) for each
    const result = lokasiList.map(async (lokasi) => {
      const jadwalData = await Jadwal.findAll({
        where: {
          id_lokasi_pmi: lokasi.id_lokasi_pmi,
          jadwal_hari: hari[getday],
        },
      });

      return {
        lokasi,
        jadwalData:
          jadwalData.length > 0
            ? jadwalData.map((item) => ({
                id_jadwal: item.id_jadwal,
                jadwal_hari: item.jadwal_hari,
                jadwal_jam_mulai: item.jadwal_jam_mulai,
                jadwal_jam_selesai: item.jadwal_jam_selesai,
              }))
            : [],
      };
    });

    // Wait for all promises to resolve
    const finalResult = await Promise.all(result);

    // Filter out items where jadwalData is empty
    const filteredResult = finalResult.filter(
      (item) => item.jadwalData.length > 0
    );

    return res.status(200).json(filteredResult);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
const {
  Jadwal,
  GolDarah,
  LokasiPmi,
  TraDonor,
  TraReqDarah,
  User,
  sequelize,
  Sequelize,
} = require("../models");

exports.getDashboardUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await User.findByPk(userId, {
      include: [{ model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] }],
    });

    const traDonor = await TraDonor.findOne({
      where: { id_user: userId },
      include: [
        { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
      ],
    });

    // Fetch data for the logged-in user as the requester (id_user_req)
    const userRequesterData = await TraReqDarah.findOne({
      where: { id_user_req: userId, status: 2 }, // Fetch only for status 2 (menerima)
      include: [{ model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] }],
    });

    // Fetch data for volunteers (sts_volunteer = 1 and excluding the logged-in user)
    const volunteerData = await User.findOne({
      where: {
        sts_volunteer: 1,
        id_user: { [Sequelize.Op.ne]: userId }, // Exclude the logged-in user
      },
      include: [{ model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] }],
    });

    // Fetch data for the logged-in user as the requester (id_user_req) for status 0 (menolak)
    const userRejectData = await TraReqDarah.findOne({
      where: { id_user_req: userId, status: 0 },
      include: [
        { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
      ],
    });

    // Build the response object
    const response = {
      sukarelawan_menerima: {
        id_user_volunteer: userRequesterData
          ? userRequesterData.id_user_volunteer
          : null,
        nama_volunteer: userRequesterData ? userRequesterData.nama : null,
        status: userRequesterData ? "Diterima" : null,
        alamat_volunteer: userRequesterData ? userRequesterData.alamat : null,
        gol_darah: userRequesterData
          ? userRequesterData.GolDarah.gol_darah
          : null,
        no_hp: userRequesterData ? userRequesterData.no_hp : null,
      },
      sukarelawan_menolak: {
        id_user_volunteer: userRejectData
          ? userRejectData.id_user_volunteer
          : null,
        nama_volunteer: userRejectData ? userRejectData.nama : null,
        status: userRejectData ? "Ditolak" : null,
        alamat_volunteer: userRejectData ? userRejectData.alamat : null,
        gol_darah: userRejectData ? userRejectData.GolDarah.gol_darah : null,
        no_hp: userRejectData ? userRejectData.no_hp : null,
      },
      pemohon: {
        id_user: userRequesterData ? userRequesterData.id_user_req : null,
        nama_pemohon: userRequesterData ? userRequesterData.nama : null,
        gol_darah: userRequesterData
          ? userRequesterData.GolDarah.gol_darah
          : null,
        alamat: userRequesterData ? userRequesterData.alamat : null,
      },
      pendonor: {
        id_donor: traDonor.id_tra_donor,
        gol_darah: traDonor.GolDarah.gol_darah,
        lokasi_pmi: traDonor.LokasiPmi.nama,
        tanggal_donor: traDonor.tgl_donor.toISOString().split("T")[0], // Format date as "YYYY-MM-DD"
      },
    };

    res.json([response]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to accept a request
// Controller function to accept a request (changed method to POST)
exports.postAcceptRequest = async (req, res) => {
  try {
    const { id_tra_req_darah } = req.body;

    // Update the status to 2 (accepted)
    const updatedRecord = await TraReqDarah.update(
      { status: 2 },
      { where: { id_tra_req_darah } }
    );

    if (updatedRecord[0] === 0) {
      // No records were updated (id_tra_req_darah not found)
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to reject a request (changed method to POST)
exports.postRejectRequest = async (req, res) => {
  try {
    const { id_tra_req_darah } = req.body;

    // Update the status to 0 (rejected)
    const updatedRecord = await TraReqDarah.update(
      { status: 0 },
      { where: { id_tra_req_darah } }
    );

    if (updatedRecord[0] === 0) {
      // No records were updated (id_tra_req_darah not found)
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};





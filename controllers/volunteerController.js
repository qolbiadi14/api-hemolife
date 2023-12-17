const { Op } = require("sequelize");
const { GolDarah, User, TraReqDarah } = require("../models");

exports.getVolunteer = async (req, res) => {
  try {
    const { golDarah, alamat } = req.query;

    // Dapatkan ID user dari req.user
    const userId = req.user.userId;

    // Cari volunteer dengan kriteria
    const volunteers = await User.findAll({
      raw: true, // Menggunakan opsi raw: true
      where: {
        id_user: {
          [Op.ne]: userId, // User sendiri tidak boleh muncul
        },
        sts_volunteer: 1,
        id_gol_darah: golDarah,
        alamat: {
          [Op.like]: `%${alamat}%`,
        },
      },
      include: [
        {
          model: GolDarah,
          attributes: ["gol_darah"],
        },
      ],
    });

    // Membuat format hasil sesuai dengan keinginan
    const formattedVolunteers = volunteers.map((volunteer) => ({
      id_user: volunteer.id_user,
      id_gol_darah: volunteer.id_gol_darah,
      nama: volunteer.nama,
      email: volunteer.email,
      no_hp: volunteer.no_hp,
      jenis_kelamin: volunteer.jenis_kelamin,
      tanggal_lahir: volunteer.tanggal_lahir,
      alamat: volunteer.alamat,
      password: volunteer.password,
      sts_volunteer: volunteer.sts_volunteer,
      gol_darah: volunteer["GolDarah.gol_darah"],
    }));

    res.json(formattedVolunteers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.requestVolunteer = async (req, res) => {
  try {
    const { id_user, nama, gol_darah, alamat } = req.body;

    // Dapatkan ID user dari req.user
    const id_user_req = req.user.userId;

    // Cek apakah user yang diminta volunteer sudah ada dan sts_volunteer = 1
    const requestedUser = await User.findOne({
      where: {
        id_user,
        sts_volunteer: 1,
        id_gol_darah: gol_darah,
        alamat,
      },
    });

    if (!requestedUser) {
      return res.status(400).json({ error: "User volunteer tidak ditemukan" });
    }

    // Hitung tanggal expired
    const tgl_req_darah = new Date();
    const tgl_expired = new Date(tgl_req_darah);
    tgl_expired.setDate(tgl_expired.getDate() + 3);

    // Buat permintaan darah
    const newRequest = await TraReqDarah.create({
      id_user_req,
      id_user_volunteer: id_user,
      id_gol_darah: gol_darah,
      tgl_req_darah,
      tgl_expired,
      status: 1,
    });

    res.json({ message: "Permintaan darah berhasil dibuat", data: newRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

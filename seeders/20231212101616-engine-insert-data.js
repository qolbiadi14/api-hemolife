"use strict";

const { nanoid } = require("nanoid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert gol_darah records first
    await queryInterface.bulkInsert("gol_darah", [
      { id_gol_darah: nanoid(5), gol_darah: "A+" },
      { id_gol_darah: nanoid(5), gol_darah: "A-" },
      { id_gol_darah: nanoid(5), gol_darah: "B+" },
      { id_gol_darah: nanoid(5), gol_darah: "B-" },
      { id_gol_darah: nanoid(5), gol_darah: "O+" },
      { id_gol_darah: nanoid(5), gol_darah: "O-" },
      { id_gol_darah: nanoid(5), gol_darah: "AB+" },
      { id_gol_darah: nanoid(5), gol_darah: "AB-" },
    ]);

    // Fetch gol_darah records
    const golDarahRecords = await queryInterface.sequelize.query(
      "SELECT id_gol_darah FROM gol_darah"
    );

    // Extract id_gol_darah values
    const idGolDarahValues = golDarahRecords[0].map(
      (record) => record.id_gol_darah
    );

    // Insert user records with id_gol_darah values
    await queryInterface.bulkInsert("user", [
      {
        id_user: nanoid(5),
        id_gol_darah: idGolDarahValues[0],
        nama: "John Doe",
        email: "john.doe@gmail.com",
        no_hp: "0825373815931",
        jenis_kelamin: "Laki-Laki",
        tanggal_lahir: new Date("2001-03-25"),
        alamat: "Jakarta Barat",
        password: "password1",
      },

      {
        id_user: nanoid(5),
        id_gol_darah: idGolDarahValues[1],
        nama: "Fiora",
        email: "fiora@gmail.com",
        no_hp: "08777395815",
        jenis_kelamin: "Perempuan",
        tanggal_lahir: new Date("2002-09-14"),
        alamat: "Bandung",
        password: "password2",
      },
    ]);

    await queryInterface.bulkInsert("lokasi_pmi", [
      {
        id_lokasi_pmi: nanoid(5),
        nama: "PMI Jawa Barat",
        email: "pmi.jawa.barat@gmail.com",
        no_telpon: "08437395734",
        alamat: "Jawa Barat",
        latitude: "-6.870538423420674",
        longitude: "107.62042308129263",
        logo: "logo_pmi_jawa_barat.png",
      },

      {
        id_lokasi_pmi: nanoid(5),
        nama: "PMI Jakarta Utara",
        email: "pmi.jakarta.utara@gmail.com",
        no_telpon: "08139573463",
        alamat: "Jakarta Utara",
        latitude: "-6.094416145072793",
        longitude: "106.92043562421657",
        logo: "logo_pmi_jakarta_utara.png",
      },

      {
        id_lokasi_pmi: nanoid(5),
        nama: "PMI Kota Tangerang",
        email: "pmi.tangerang@gmail.com",
        no_telpon: "081395752742",
        alamat: "Kota Tangerang",
        latitude: "-6.107323353486352",
        longitude: "106.64473319407314",
        logo: "logo_pmi_kota_tangerang.png",
      },
    ]);

    const lokPmiRecords = await queryInterface.sequelize.query(
      "SELECT id_lokasi_pmi FROM lokasi_pmi"
    );

    const idLokPmiValues = lokPmiRecords[0].map(
      (record) => record.id_lokasi_pmi
    );

    await queryInterface.bulkInsert("jadwal", [
      {
        id_jadwal: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[0],
        jadwal_hari: "SENIN",
        jadwal_jam_mulai: "08:00:00",
        jadwal_jam_selesai: "16:30:00",
      },

      {
        id_jadwal: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[0],
        jadwal_hari: "SELASA",
        jadwal_jam_mulai: "09:00:00",
        jadwal_jam_selesai: "14:55:00",
      },

      {
        id_jadwal: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[1],
        jadwal_hari: "SELASA",
        jadwal_jam_mulai: "09:00:00",
        jadwal_jam_selesai: "14:55:00",
      },

      {
        id_jadwal: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[2],
        jadwal_hari: "RABU",
        jadwal_jam_mulai: "09:00:00",
        jadwal_jam_selesai: "14:55:00",
      },
    ]);

    await queryInterface.bulkInsert("bank_darah", [
      {
        id_bank_darah: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[0],
        id_gol_darah: idGolDarahValues[0],
        jumlah_kantong_darah: 1,
      },

      {
        id_bank_darah: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[1],
        id_gol_darah: idGolDarahValues[1],
        jumlah_kantong_darah: 4,
      },

      {
        id_bank_darah: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[1],
        id_gol_darah: idGolDarahValues[2],
        jumlah_kantong_darah: 3,
      },

      {
        id_bank_darah: nanoid(5),
        id_lokasi_pmi: idLokPmiValues[0],
        id_gol_darah: idGolDarahValues[2],
        jumlah_kantong_darah: 3,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete user records
    await queryInterface.bulkDelete("user", null, {});

    // Delete gol_darah records
    await queryInterface.bulkDelete("gol_darah", null, {});

    await queryInterface.bulkDelete("lokasi_pmi", null, {});
  },
};

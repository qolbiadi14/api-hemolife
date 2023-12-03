"use strict";

const now = new Date();
const date = `0${now.getDate()}`.slice(-2); // tanggal
const month = `0${now.getMonth() + 1}`.slice(-2); // bulan
const year = now.getFullYear(); // tahun

const formattedDate = `${year}-${month}-${date}`; // format tanggal menjadi "YYYY-MM-DD"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("tra_donor", [
			{
				id_user: "GWyUz",
				id_gol_darah: "47SZe",
				id_lokasi_pmi: "-gfMn",
				tgl_donor: formattedDate,
				status: 1,
			},

			{
				id_user: "R01Ov",
				id_gol_darah: "eJgku",
				id_lokasi_pmi: "OsQ6J",
				tgl_donor: formattedDate,
				status: 1,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("tra_donor", null, {});
	},
};

"use strict";

const { nanoid } = require("nanoid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
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
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("lokasi_pmi", null, {});
	},
};

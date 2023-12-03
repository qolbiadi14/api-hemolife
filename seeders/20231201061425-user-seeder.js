"use strict";

const { nanoid } = require("nanoid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert("user", [
			{
				id_user: nanoid(5),
				id_gol_darah: "47SZe",
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
				id_gol_darah: "eJgku",
				nama: "Fiora",
				email: "fiora@gmail.com",
				no_hp: "08777395815",
				jenis_kelamin: "Perempuan",
				tanggal_lahir: new Date("2002-09-14"),
				alamat: "Bandung",
				password: "password2",
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("user", null, {});
	},
};

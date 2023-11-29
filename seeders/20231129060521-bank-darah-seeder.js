'use strict';

const { nanoid } = require('nanoid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('bank_darah', [
			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '-gfMn',
				id_gol_darah: '47SZe',
				jumlah_kantong_darah: 75,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '-gfMn',
				id_gol_darah: 'eJgku',
				jumlah_kantong_darah: 50,
			},

			{
				id_bank_darah: nanoid(5),
				id_lokasi_pmi: '-gfMn',
				id_gol_darah: 'i4vRI',
				jumlah_kantong_darah: 60,
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('bank_darah', null, {});
	},
};

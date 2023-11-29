const { DashboardAdmin, GolDarah, LokasiPmi } = require("../models");

const getAllBloodBank = async (req, res) => {
	try {
		const bloodBank = await DashboardAdmin.findAll({
			attributes: [
				"id_bank_darah",
				"id_lokasi_pmi",
				"id_gol_darah",
				"jumlah_kantong_darah",
			],
		});

		if (bloodBank) {
			const result = {
				message: "Sukses menampilkan seluruh bank darah",
				data: bloodBank,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: "Data tidak ditemukan!",
				data: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

const getBloodBankByPmiLocation = async (req, res) => {
	const idLokPmi = req.params.id;

	try {
		const bloodBank = await DashboardAdmin.findAll({
			where: {
				id_lokasi_pmi: idLokPmi,
			},
			include: [
				{ model: LokasiPmi, as: "LokasiPmi" },
				{ model: GolDarah, as: "GolDarah" },
			],

			// jika ingin outputnya dicustome
			// include: [
			// 	{ model: LokasiPmi, as: 'LokasiPmi', attributes: ['nama'] },
			// 	{ model: GolDarah, as: 'GolDarah', attributes: ['gol_darah'] },
			// ],
		});

		if (bloodBank.length > 0) {
			const result = {
				message: `Bank darah dengan id lokasi pmi ${idLokPmi} berhasil ditampilkan`,
				data: bloodBank,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: "Data tidak ditemukan!",
				data: null,
			};
			res.status(404).json(error);
		}
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = { getAllBloodBank, getBloodBankByPmiLocation };

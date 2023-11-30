const { BankDarah, GolDarah, LokasiPmi } = require("../models");
const Validator = require("fastest-validator");

const v = new Validator();

const getAllBloodBank = async (req, res) => {
	try {
		const bankDarah = await BankDarah.findAll({
			attributes: [
				"id_bank_darah",
				"id_lokasi_pmi",
				"id_gol_darah",
				"jumlah_kantong_darah",
			],
		});

		if (bankDarah) {
			const result = {
				message: "Sukses menampilkan seluruh bank darah",
				data: bankDarah,
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

const getBloodBankByPmiId = async (req, res) => {
	try {
		const idLokPmi = req.params.id;
		const bankDarah = await BankDarah.findAll({
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

		if (bankDarah.length > 0) {
			const result = {
				message: `Bank darah dengan id lokasi pmi ${idLokPmi} berhasil ditampilkan`,
				stok_bank_darah: bankDarah,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: "Data tidak ditemukan!",
				stok_bank_darah: null,
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

const updateBloodBankByPmiId = async (req, res) => {
	try {
		const { jumlah_kantong_darah, id_gol_darah } = req.body;

		const bankDarah = await BankDarah.findOne({
			where: { id_lokasi_pmi: req.params.id },
			include: [
				{
					model: GolDarah,
					where: { id_gol_darah: id_gol_darah },
				},
			],
		});

		if (!bankDarah) {
			const error = {
				message: "Data tidak ditemukan!",
				stok_bank_darah: null,
			};
			res.status(404).json(error);
		}

		const schema = {
			jumlah_kantong_darah: "number|optional",
		};

		const validate = v.validate(req.body, schema);

		if (validate.length) {
			return res.status(400).json(validate);
		}

		const updatedBloodBank = await bankDarah.update({
			jumlah_kantong_darah: jumlah_kantong_darah,
		});

		const result = {
			message: "Jumlah kantong darah berhasil diubah",
			stok_bank_darah: updatedBloodBank,
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

module.exports = {
	getAllBloodBank,
	getBloodBankByPmiId,
	updateBloodBankByPmiId,
};
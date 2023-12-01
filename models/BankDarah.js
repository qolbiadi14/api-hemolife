module.exports = (sequelize, DataTypes) => {
	const BankDarah = sequelize.define(
		"BankDarah",
		{
			id_bank_darah: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			id_lokasi_pmi: {
				type: DataTypes.STRING,
			},
			id_gol_darah: {
				type: DataTypes.STRING,
			},
			jumlah_kantong_darah: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			tableName: "bank_darah",
			timestamps: false,
		}
	);

	BankDarah.associate = function (models) {
		BankDarah.belongsTo(models.LokasiPmi, { foreignKey: "id_lokasi_pmi" });
		BankDarah.belongsTo(models.GolDarah, { foreignKey: "id_gol_darah" });
	};

	return BankDarah;
};

module.exports = (sequelize, DataTypes) => {
	const DashboardAdmin = sequelize.define(
		'DashboardAdmin',
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
			tableName: 'bank_darah',
			timestamps: false,
		}
	);

	DashboardAdmin.associate = function (models) {
		DashboardAdmin.belongsTo(models.LokasiPmi, { foreignKey: 'id_lokasi_pmi' });
		DashboardAdmin.belongsTo(models.GolDarah, { foreignKey: 'id_gol_darah' });
	};

	return DashboardAdmin;
};

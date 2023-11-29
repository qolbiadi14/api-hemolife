module.exports = (sequelize, DataTypes) => {
	const LokasiPmi = sequelize.define(
		'LokasiPmi',
		{
			id_lokasi_pmi: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			nama: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			no_telpon: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			alamat: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			latitude: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			logo: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: 'lokasi_pmi',
			timestamps: false,
		}
	);

	return LokasiPmi;
};

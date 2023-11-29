module.exports = (sequelize, DataTypes) => {
	const GolDarah = sequelize.define(
		"GolDarah",
		{
			id_gol_darah: {
				type: DataTypes.STRING,
				primaryKey: true,
				allowNull: false,
			},
			gol_darah: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "gol_darah",
			timestamps: false,
		}
	);

	return GolDarah;
};

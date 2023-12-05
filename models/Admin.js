const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
	const Admin = sequelize.define(
		"Admin",
		{
			id_admin: {
				type: DataTypes.STRING,
				defaultValue: () => nanoid(),
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
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			tableName: "admin",
			timestamps: false,
		}
	);

	return Admin;
};

const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
	const Login = sequelize.define(
		"Login",
		{
			id_user: {
				type: DataTypes.STRING,
				defaultValue: () => nanoid(),
				primaryKey: true,
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
			hooks: {
				beforeCreate: async login => {
					const saltRounds = 10;
					// Check if the password is already hashed
					if (!login.password.startsWith("$2b$")) {
						login.password = await bcrypt.hash(login.password, saltRounds);
					}
				},
			},
			tableName: "user",
			timestamps: false,
		}
	);

	return Login;
};

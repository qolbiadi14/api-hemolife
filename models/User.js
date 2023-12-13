const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        id_user: {
          type: DataTypes.STRING,
          defaultValue: () => nanoid(),
          primaryKey: true,
          allowNull: false,
        },
        id_gol_darah: {
          type: DataTypes.STRING,
          references: {
            model: "gol_darah",
            key: "id_gol_darah",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
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
        no_hp: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        jenis_kelamin: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isIn: [["Laki-laki", "Perempuan"]],
          },
        },
        tanggal_lahir: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        alamat: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sts_volunteer: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        tableName: "user",
        timestamps: false,
      }
    );

    return User;
}
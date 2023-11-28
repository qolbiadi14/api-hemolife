const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      id_user: {
        type: DataTypes.STRING,
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
    }, {
        tableName: "user"
    });

    return User;
}
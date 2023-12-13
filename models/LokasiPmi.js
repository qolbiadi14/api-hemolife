module.exports = (sequelize, DataTypes) => {
  const LokasiPmi = sequelize.define(
    "LokasiPmi",
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
      tableName: "lokasi_pmi",
      timestamps: false,
    }
  );

  LokasiPmi.associate = function (models) {
    LokasiPmi.hasMany(models.BankDarah, { foreignKey: "id_lokasi_pmi" });
    LokasiPmi.hasMany(models.Jadwal, { foreignKey: "id_lokasi_pmi" });
    LokasiPmi.hasMany(models.TraDonor, { foreignKey: "id_lokasi_pmi" });
    LokasiPmi.hasMany(models.TraReqDarah, { foreignKey: "id_lokasi_pmi" });
  };
  return LokasiPmi;
};

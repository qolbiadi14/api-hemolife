// model Jadwal.js
module.exports = (sequelize, DataTypes) => {
  const Jadwal = sequelize.define(
    "Jadwal",
    {
      id_jadwal: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      id_lokasi_pmi: {
        type: DataTypes.STRING,
      },
      jadwal_hari: {
        type: DataTypes.STRING,
      },
      jadwal_jam_mulai: {
        type: DataTypes.TIME,
      },
      jadwal_jam_selesai: {
        type: DataTypes.TIME,
      },
    },
    {
      tableName: "jadwal",
      timestamps: false,
    }
  );

  Jadwal.associate = function (models) {
    Jadwal.belongsTo(models.LokasiPmi, { foreignKey: "id_lokasi_pmi" });
  };
  return Jadwal;
};

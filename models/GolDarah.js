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

  GolDarah.associate = function (models) {
    GolDarah.hasMany(models.BankDarah, { foreignKey: "id_gol_darah" });
    GolDarah.hasMany(models.TraDonor, { foreignKey: "id_gol_darah" });
    GolDarah.hasMany(models.TraReqDarah, { foreignKey: "id_gol_darah" });
  };

  return GolDarah;
};

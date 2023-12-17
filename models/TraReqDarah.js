module.exports = (sequelize, DataTypes) => {
  const TraReqdarah = sequelize.define(
    "TraReqDarah",
    {
      id_tra_req_darah: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user_req: {
        type: DataTypes.STRING,
      },
      id_user_volunteer: {
        type: DataTypes.STRING,
      },
      id_gol_darah: {
        type: DataTypes.STRING,
      },
      tgl_req_darah: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      tgl_expired: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
    },
    { tableName: "tra_req_darah", timestamps: false }
  );

  TraReqdarah.associate = function (models) {
    TraReqdarah.belongsTo(models.User, { foreignKey: "id_user_req" });
    TraReqdarah.belongsTo(models.GolDarah, { foreignKey: "id_gol_darah" });
  };

  return TraReqdarah;
};

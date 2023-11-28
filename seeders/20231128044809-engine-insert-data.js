'use strict';

const { nanoid } = require("nanoid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert("gol_darah", [
      { id_gol_darah: nanoid(5), gol_darah: "A+" },
      { id_gol_darah: nanoid(5), gol_darah: "A-" },
      { id_gol_darah: nanoid(5), gol_darah: "B+" },
      { id_gol_darah: nanoid(5), gol_darah: "B-" },
      { id_gol_darah: nanoid(5), gol_darah: "O+" },
      { id_gol_darah: nanoid(5), gol_darah: "O-" },
      { id_gol_darah: nanoid(5), gol_darah: "AB+" },
      { id_gol_darah: nanoid(5), gol_darah: "AB-" },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("gol_darah", null, {});
  }
};

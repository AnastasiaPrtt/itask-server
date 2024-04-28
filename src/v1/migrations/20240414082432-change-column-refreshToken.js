'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tokens', 'refreshToken', {
      type: Sequelize.STRING(1000), // Установка максимальной длины в 1000 символов
      allowNull: false
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('tokens', 'refreshToken', {
      type: Sequelize.STRING(1000), // Установка максимальной длины в 1000 символов
      allowNull: false
    });
  }
};

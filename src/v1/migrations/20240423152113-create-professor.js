'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('professors');
  }
};



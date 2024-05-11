'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('professorCourses', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      professorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'professors',
          key: 'id'
        }
      },
      groupCycleId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'groupCycles',
          key: 'id'
        }
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
    await queryInterface.dropTable('professorCourses');
  }
};
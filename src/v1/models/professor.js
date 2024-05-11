'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    static associate(models) {
      Professor.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
      Professor.belongsToMany(models.groupCycles, { through: 'professorCourses' })
    }
  }
  Professor.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    fullName: DataTypes.STRING,
    tel: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'professors',
  });
  return Professor;
};
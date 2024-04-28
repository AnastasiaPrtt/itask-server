'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professor extends Model {
    static associate(models) {
      // Define association here
      Professor.belongsTo(models.users, { foreignKey: 'userId' });
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
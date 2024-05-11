'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Student.belongsTo(models.users, { foreignKey: 'userId', as: 'users' });
      Student.belongsTo(models.groups, { foreignKey: 'groupId', as: 'groups' });
    }
  }
  Student.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: DataTypes.UUID,
    groupId: DataTypes.UUID,
    fullName: DataTypes.STRING,
    tel: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'students',
  });
  return Student;
};
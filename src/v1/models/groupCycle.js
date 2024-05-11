'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class groupCycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      groupCycle.belongsToMany(models.professors, { through: 'professorCourses' })
    }
  }
  groupCycle.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    groupId: DataTypes.UUID,
    cycleId: DataTypes.UUID,
    courseId: DataTypes.UUID 
  }, {
    sequelize,
    modelName: 'groupCycles',
  });
  return groupCycle;
};
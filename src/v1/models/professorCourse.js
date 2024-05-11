'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class professorCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
  }
  professorCourse.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }, 
    professorId: DataTypes.UUID,
    groupCycleId: DataTypes.UUID 
  }, {
    sequelize,
    modelName: 'professorCourses',
  });
  return professorCourse;
};
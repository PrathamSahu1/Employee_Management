'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Attendance.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    }
  }
  Attendance.init({
    employeeId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendances',
    underscored: true
  });
  return Attendance;
};
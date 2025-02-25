'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Employee.belongsTo(models.Department, { foreignKey: 'departmentId' });
      models.Employee.hasMany(models.Attendance, { foreignKey: 'employeeId' });
      models.Employee.hasMany(models.SalaryHistory, { foreignKey: 'employeeId' });
    }
  }
  Employee.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    departmentId: DataTypes.INTEGER,
    salary: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Employee',
    underscored:true
  });
  return Employee;
};
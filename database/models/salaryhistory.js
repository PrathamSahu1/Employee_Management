'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalaryHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.SalaryHistory.belongsTo(models.Employee, { foreignKey: 'employeeId' });
    }
  }
  SalaryHistory.init({
    employeeId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    paymentDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'SalaryHistory',
  });
  return SalaryHistory;
};
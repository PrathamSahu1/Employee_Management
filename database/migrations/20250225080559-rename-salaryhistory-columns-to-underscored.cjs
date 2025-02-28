'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.renameColumn('SalaryHistories', 'employeeId', 'employee_id');
    await queryInterface.renameColumn('SalaryHistories', 'paymentDate', 'payment_date');
    await queryInterface.renameColumn('SalaryHistories', 'createdAt', 'created_at');
    await queryInterface.renameColumn('SalaryHistories', 'updatedAt', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('SalaryHistories', 'payment_date', 'paymentDate');
    await queryInterface.renameColumn('SalaryHistories', 'employee_id', 'employeeId');
    await queryInterface.renameColumn('SalaryHistories', 'created_at', 'createdAt');
    await queryInterface.renameColumn('SalaryHistories', 'updated_at', 'updatedAt');
  }
};

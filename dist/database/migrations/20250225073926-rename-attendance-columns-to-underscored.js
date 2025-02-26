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
    await queryInterface.renameColumn('Attendances', 'employeeId', 'employee_id');
    await queryInterface.renameColumn('Attendances', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Attendances', 'updatedAt', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('Attendances', 'employee_id', 'employeeId');
    await queryInterface.renameColumn('Attendances', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Attendances', 'updated_at', 'updatedAt');
  }
};

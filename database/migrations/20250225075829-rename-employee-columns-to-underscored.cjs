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
    await queryInterface.renameColumn('Employees', 'departmentId', 'department_id');
    await queryInterface.renameColumn('Employees', 'createdAt', 'created_at');
    await queryInterface.renameColumn('Employees', 'updatedAt', 'updated_at');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.renameColumn('Employees', 'department_id', 'departmentId');
    await queryInterface.renameColumn('Employees', 'created_at', 'createdAt');
    await queryInterface.renameColumn('Employees', 'updated_at', 'updatedAt');
  }
};

const { Department } = require('../database/models');
const logger = require('../utils/logger');
const { ApiError } = require('../errors/apiError');

const createDepartment = async (departmentData) => {
    try {
        // Create new department(s)
        const department = await Department.bulkCreate(departmentData);

        logger.info('New department(s) created');
        return department;
    } catch (error) {
        logger.error('Error creating department: ' + error.message);
        throw new ApiError(500, 'Error creating department');
    }
};

module.exports = { createDepartment };
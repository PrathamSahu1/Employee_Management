import db from '../database/models/index.js';
import logger from '../utils/logger.js';
import { ApiError } from '../errors/apiError.js';

const { Department } = db;

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

export default { createDepartment };
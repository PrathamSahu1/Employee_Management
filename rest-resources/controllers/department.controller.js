import departmentService from '../../services/department.service.js';
import { ApiResponse } from '../../errors/apiResponse.js';
import logger from '../../utils/logger.js';

const createDepartment = async (req, res) => {
    try {
        const departmentData = req.body;

        const department = await departmentService.createDepartment(departmentData);

        res.status(201).json(new ApiResponse(201, department, "Department created successfully"));
    } catch (error) {
        logger.error('Error creating department: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export { createDepartment };
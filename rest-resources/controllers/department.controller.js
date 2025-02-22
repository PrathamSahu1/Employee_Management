const departmentService = require('../../services/department.service');
const { ApiResponse } = require('../../errors/apiResponse');
const logger = require('../../utils/logger');

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

module.exports = { createDepartment };
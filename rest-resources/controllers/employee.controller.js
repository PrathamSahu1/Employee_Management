const employeeService = require('../../services/employee.service');
const {ApiResponse} = require('../../errors/apiResponse')
const logger = require('../../utils/logger');

const getEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        res.status(200).json(new ApiResponse(200, employees, "Employees fetched successfully"));
    } catch (error) {
        logger.error('Error fetching employees: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const addEmployee = async (req, res) => {
    try {
        const employee = await employeeService.createEmployee(req.body);
        res.status(201).json(new ApiResponse(201, employee, "Employee added successfully"));
    } catch (error) {
        logger.error('Error adding employee: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};


module.exports = {getEmployees,addEmployee}
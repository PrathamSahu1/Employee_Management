import employeeService from '../../services/employee.service.js';
import { ApiResponse } from '../../errors/apiResponse.js';
import logger from '../../utils/logger.js';

const getEmployees = async (req, res) => {
    try {
        const employees = await employeeService.getAllEmployees();
        console.log(employees)
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

const updateEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const updatedEmployee = await employeeService.updateEmployee(employeeId, req.body);

        res.status(200).json(new ApiResponse(200, updatedEmployee, 'Employee updated successfully'));
    } catch (error) {
        logger.error('Error updating employee: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const result = await employeeService.deleteEmployee(employeeId);

        res.status(200).json(new ApiResponse(200, result, 'Employee deleted successfully'));
    } catch (error) {
        logger.error('Error deleting employee: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};



export {getEmployees,addEmployee,updateEmployee,deleteEmployee}
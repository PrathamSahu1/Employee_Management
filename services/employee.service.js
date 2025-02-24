const { Employee, Department } = require('../database/models');
const {ApiError} = require('../errors/apiError')
const logger = require('../utils/logger');

const getAllEmployees = async () => {
    try {
        const employees = await Employee.findAll({ include: Department });
        logger.info('Fetched all employees');
        return employees;
    } catch (error) {
        logger.error('Error fetching employees in DB: ' + error.message);
        throw new ApiError(400,"Error fetching employees"); // Pass error to controller for response handling
    }
};

const createEmployee = async (employeeData) => {
    try {
        const employee = await Employee.create(employeeData);
        logger.info(`Employee added: ${employee.name}`);
        return employee;
    } catch (error) {
        logger.error('Error adding employee in DB: ' + error.message);
        throw new ApiError(400,"Error adding employees"); // Pass error to controller
    }
};

const updateEmployee = async (employeeId,updateData) => {
    try {
        const employee = await Employee.findByPk(employeeId);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }

     const updatedEmployee = await Employee.update(updateData,{where:{id:employeeId}});
    return updatedEmployee;
    } catch (error) {
        logger.error('Error updating employee in DB: ' + error.message);
        if(error instanceof ApiError){
            throw error
        }
        throw new ApiError(400,"Error updating employees"); // Pass error to controller
    }
};

const deleteEmployee = async (employeeId) => {
    try {
        const employee = await Employee.findByPk(employeeId);
        if (!employee) {
            throw new ApiError(404, 'Employee not found');
        }
    
        await employee.destroy();
        return { message: 'Employee deleted successfully' };
        
    } catch (error) {
        logger.error('Error updating employee in DB: ' + error.message);
        throw new ApiError(400,"Error updating employees"); // Pass error to controller
    }
};

module.exports = { getAllEmployees, createEmployee,updateEmployee,deleteEmployee };
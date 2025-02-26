import db from '../database/models/index.js';
import { ApiError } from '../errors/apiError.js';
import logger from '../utils/logger.js';

const { Employee, Department } = db;

const getAllEmployees = async () => {
   
    try {
        const employees = await Employee.findAll({ include: Department, limit:5 });
        logger.info('Fetched all employees');
        
        return employees;
    } catch (error) {
       
        logger.error('Error fetching employees in DB: ' + error.message);
        throw new ApiError(400,"Error fetching employees"); // Pass error to controller for response handling
    }
};

const createEmployee = async (employeeData) => {
    const transaction = await db.sequelize.transaction();
    try {
        const employee = await Employee.create(employeeData,{transaction});
        logger.info(`Employee added: ${employee.name}`);
        await transaction.commit()
        return employee;
    } catch (error) {
        await transaction.rollback();
        logger.error('Error adding employee in DB: ' + error.message);
        throw new ApiError(400,"Error adding employees"); // Pass error to controller
    }
};

const updateEmployee = async (employeeId,updateData) => {
    const transaction = await db.sequelize.transaction();
    try {
        const employee = await Employee.findByPk(employeeId,{transaction});
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }

     const updatedEmployee = await Employee.update(updateData,{where:{id:employeeId},transaction});
     await transaction.commit()
    return updatedEmployee;
    } catch (error) {
        await transaction.rollback();
        logger.error('Error updating employee in DB: ' + error.message);
        if(error instanceof ApiError){
            throw error
        }
        throw new ApiError(400,"Error updating employees"); // Pass error to controller
    }
};

const deleteEmployee = async (employeeId) => {
    const transaction = await db.sequelize.transaction();
    try {
        const employee = await Employee.findByPk(employeeId,{transaction});
        if (!employee) {
            throw new ApiError(404, 'Employee not found');
        }
    
        await employee.destroy({transaction});
        await transaction.commit()
        return { message: 'Employee deleted successfully' };
        
    } catch (error) {
        await transaction.rollback();
        logger.error('Error updating employee in DB: ' + error.message);
        throw new ApiError(400,"Error updating employees"); // Pass error to controller
    }
};

export default { getAllEmployees, createEmployee,updateEmployee,deleteEmployee };
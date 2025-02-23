const { SalaryHistory, Employee } = require('../database/models');
const {ApiError} = require('../errors/apiError');


/**
 * Add a salary record for an employee.
 */
const addSalaryRecord = async (employeeId, amount, paymentDate) => {
    try{
    // Check if employee exists
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
        throw new ApiError(404, 'Employee not found');
    }

    // Create salary history entry
    const salaryRecord = await SalaryHistory.create({ employeeId, amount, paymentDate });

    return salaryRecord;
}
    catch (error) {
        logger.error('Error adding salaries in DB: ' + error.message);
        throw new ApiError(400,"Error adding salaries"); // Pass error to controller for response handling
    }
};

/**
 * Get all salary records (Admin/Manager Access).
 */
const getAllSalaryRecords = async () => {
    try{
    return await SalaryHistory.findAll({ include: { model: Employee, attributes: ['name', 'email'] } });
    } catch (error) {
        logger.error('Error fetching salaries from DB: ' + error.message);
        throw new ApiError(400,"Error fetching salaries"); // Pass error to controller for response handling
    }

};

/**
 * Get salary records for a specific employee.
 */
const getEmployeeSalaryRecords = async (employeeId) => {
    try{
    return await SalaryHistory.findAll({
        where: { employeeId },
        include: { model: Employee, attributes: ['name', 'email'] }
    })}
    catch (error) {
        logger.error('Error fetching salaries in DB: ' + error.message);
        throw new ApiError(400,"Error fetching salaries"); // Pass error to controller for response handling
    }
};

module.exports = {
    addSalaryRecord,
    getAllSalaryRecords,
    getEmployeeSalaryRecords
};

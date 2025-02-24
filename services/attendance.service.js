
const {Attendance} = require('../database/models/index')
const {ApiError} = require('../errors/apiError')
const logger = require('../utils/logger')

const markAttendance = async (employeeId, status) => {
    const transaction = await db.sequelize.transaction();
    try {
        const today = new Date().toISOString().split('T')[0];

        // Check if attendance is already marked today
        const existingAttendance = await Attendance.findOne({
            where: { employeeId, date: today },transaction
        });

        if (existingAttendance) {
            throw new ApiError(400, "Attendance already marked for today.");
        }

        // Mark attendance
        const attendance = await Attendance.create({ employeeId, date: today, status },{transaction});
        await transaction.commit();

        logger.info(`Attendance marked for employee ID ${employeeId}`);
        return { message: "Attendance marked successfully", attendance };

    } catch (error) {
        await transaction.rollback();
        logger.error("Error marking attendance: " + error.message);
        if(error instanceof ApiError){
            throw error
        }
        throw new ApiError(500, "Internal server error");
    }
};

module.exports = {markAttendance}
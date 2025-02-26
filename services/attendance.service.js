import { ApiError } from '../errors/apiError.js';
import logger from '../utils/logger.js';
import db from '../database/models/index.js';
const { Attendance, Employee } = db;

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

const getAttendance = async (user) => {
   
    try {
        
        // If the user is an employee, they can only see their own attendance
        if (user.role === 'employee') {
            return await Attendance.findAll({
                where: { employeeId: user.employeeId },
                include: { model: Employee, attributes: ['name', 'email'] }
            });
        }

        // If Admin or Manager, they can see all attendance records
        return await Attendance.findAll({
            include: { model: Employee, attributes: ['name', 'email'] }
        });
        
        

    } catch (error) {
        
        throw new ApiError(500, "Error fetching attendance records");
    }
};

export default { markAttendance, getAttendance };
 
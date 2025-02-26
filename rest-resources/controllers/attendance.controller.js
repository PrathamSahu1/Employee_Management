import { ApiResponse } from '../../errors/apiResponse.js';
import attendanceService from '../../services/attendance.service.js';



const markAttendance = async (req, res) => {
    try {
        const { status } = req.body;
        const { employeeId } = req.user; // Extract from token

        console.log(req.user);

        const response = await attendanceService.markAttendance(employeeId, status);
        res.status(201).json(new ApiResponse(201,response.attendance,response.message));

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

const getAttendance = async (req, res) => {
    
    try {
     
        const attendanceRecords = await attendanceService.getAttendance(req.user);
        res.status(201).json(new ApiResponse(201,attendanceRecords,"attendances fetched successfully"));

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};


export {markAttendance,getAttendance}
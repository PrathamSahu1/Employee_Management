const { ApiResponse } = require('../../errors/apiResponse');
const attendanceService = require('../../services/attendance.service')


const markAttendance = async (req, res) => {
    try {
        const { status } = req.body;
        const { employeeId, role } = req.user; // Extract from token

        console.log(req.user);

        if (!employeeId || role !== 'employee') {
            return res.status(403).json({ message: "Unauthorized to mark attendance" });
        }

        const response = await attendanceService.markAttendance(employeeId, status);
        res.status(201).json(new ApiResponse(201,response.attendance,response.message));

    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

module.exports = {markAttendance}
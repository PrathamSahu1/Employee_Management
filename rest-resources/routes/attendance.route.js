const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { markAttendance } = require('../controllers/attendance.controller');
const validationSchema = require('../middleware/validateRequest.middleware')
const attendanceSchema = require('../../json-schemas/attendance.schema')


const router = express.Router();

// Employees can mark attendance
router.post('/', authenticate,validationSchema(attendanceSchema), markAttendance);

module.exports = router;

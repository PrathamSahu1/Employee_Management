const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/accessControl.middleware');
// const { markAttendance } = require('../controllers/attendance.c');

const router = express.Router();

// Employees can mark attendance
router.post('/', authenticate, checkRole(['employee']), markAttendance);

module.exports = router;

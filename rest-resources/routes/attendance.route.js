const express = require('express');
const { authenticate } = require('../middleware/auth.middleware');

const { markAttendance } = require('../controllers/attendance.controller');

const router = express.Router();

// Employees can mark attendance
router.post('/', authenticate, markAttendance);

module.exports = router;

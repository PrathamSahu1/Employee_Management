import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { markAttendance, getAttendance } from '../controllers/attendance.controller.js';
import validationSchema from '../middleware/validateRequest.middleware.js';
import attendanceSchema from '../../json-schemas/attendance.schema.js';


const router = express.Router();

// Employees can mark attendance
router.post('/', authenticate,validationSchema(attendanceSchema), markAttendance);
router.get('/', authenticate, getAttendance);


export default router;

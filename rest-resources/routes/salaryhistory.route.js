import express from 'express';
import salaryHistoryController from '../controllers/salaryhistory.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/accessControl.middleware.js';
import validationSchema from '../middleware/validateRequest.middleware.js';
import salaryHistorySchema from '../../json-schemas/salary.schema.js';

const router = express.Router();


// Only Admin & Manager can add salary records
router.post('/', authenticate, checkRole(['admin', 'manager']),validationSchema(salaryHistorySchema), salaryHistoryController.addSalaryRecord);

// Admin & Manager can get all salary records
router.get('/all', authenticate, checkRole(['admin', 'manager']), salaryHistoryController.getAllSalaryRecords);

// Employees can view their own salary records
router.get('/', authenticate, checkRole(['employee']), salaryHistoryController.getEmployeeSalaryRecords);

export default router;

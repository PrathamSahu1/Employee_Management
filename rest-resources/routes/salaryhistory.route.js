const express = require('express');
const router = express.Router();
const salaryHistoryController = require('../controllers/salaryhistory.controller');
const {authenticate} = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/accessControl.middleware');
const validationSchema = require('../middleware/validateRequest.middleware')
const salaryHistorySchema = require('../../json-schemas/salary.schema')

// Only Admin & Manager can add salary records
router.post('/', authenticate, checkRole(['admin', 'manager']),validationSchema(salaryHistorySchema), salaryHistoryController.addSalaryRecord);

// Admin & Manager can get all salary records
router.get('/all', authenticate, checkRole(['admin', 'manager']),validationSchema(salaryHistorySchema), salaryHistoryController.getAllSalaryRecords);

// Employees can view their own salary records
router.get('/', authenticate, checkRole(['employee']),validationSchema(salaryHistorySchema), salaryHistoryController.getEmployeeSalaryRecords);

module.exports = router;

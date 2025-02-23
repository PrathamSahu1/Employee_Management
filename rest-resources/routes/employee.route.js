const express = require('express');
const { getEmployees, addEmployee } = require('../controllers/employee.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/accessControl.middleware');
const validationSchema = require('../middleware/validateRequest.middleware')
const employeeSchema = require('../../json-schemas/employee.schema')

const router = express.Router();

router.get('/', authenticate, checkRole(['admin', 'manager']), getEmployees);
router.post('/', authenticate, checkRole(['admin', 'manager']),validationSchema(employeeSchema), addEmployee);

module.exports = router;

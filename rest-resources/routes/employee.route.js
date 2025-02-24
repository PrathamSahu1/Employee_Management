const express = require('express');
const { getEmployees, addEmployee,updateEmployee,deleteEmployee } = require('../controllers/employee.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { checkRole } = require('../middleware/accessControl.middleware');
const validationSchema = require('../middleware/validateRequest.middleware')
const employeeSchema = require('../../json-schemas/employee.schema')

const router = express.Router();

router.get('/', authenticate, checkRole(['admin', 'manager']), getEmployees);
router.post('/', authenticate, checkRole(['admin', 'manager']),validationSchema(employeeSchema), addEmployee);
router.patch('/:employeeId', authenticate, checkRole(['admin', 'manager']), updateEmployee);
router.delete('/:employeeId', authenticate, checkRole(['admin', 'manager']),deleteEmployee);

module.exports = router;

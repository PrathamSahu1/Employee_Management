import express from 'express';
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from '../controllers/employee.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { checkRole } from '../middleware/accessControl.middleware.js';
import validationSchema from '../middleware/validateRequest.middleware.js';
import employeeSchema from '../../json-schemas/employee.schema.js';

const router = express.Router();

router.get('/', authenticate, checkRole(['admin', 'manager']), getEmployees);
router.post('/', authenticate, checkRole(['admin', 'manager']),validationSchema(employeeSchema), addEmployee);
router.patch('/:employeeId', authenticate, checkRole(['admin', 'manager']), updateEmployee);
router.delete('/:employeeId', authenticate, checkRole(['admin', 'manager']),deleteEmployee);

export default router;

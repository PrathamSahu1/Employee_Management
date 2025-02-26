import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { checkRole } from '../middleware/accessControl.middleware.js';
// const { getUsers, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', authenticate, checkRole(['admin']), getUsers);
router.delete('/users/:id', authenticate, checkRole(['admin']), deleteUser);

export default router;

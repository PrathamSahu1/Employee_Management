import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import validationSchema from '../middleware/validateRequest.middleware.js';
import userSchema from '../../json-schemas/user.schema.js';


const router = express.Router();

router.post('/register',validationSchema(userSchema), register);
router.post('/login', login);

// router.delete('/delete', authenticate, deleteUser);

export default router;

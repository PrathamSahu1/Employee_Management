const express = require('express');
const { register, login } = require('../controllers/auth.controller');
const validationSchema = require('../middleware/validateRequest.middleware')
const userSchema = require('../../json-schemas/user.schema')

const router = express.Router();

router.post('/register',validationSchema(userSchema), register);
router.post('/login', login);
// router.delete('/delete', authenticate, deleteUser);

module.exports = router;

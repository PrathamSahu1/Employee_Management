const express = require('express');
const { register, login } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.delete('/delete', authenticate, deleteUser);

module.exports = router;

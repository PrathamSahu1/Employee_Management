const express = require('express');
const { authenticate } = require('../middleware/auth');
const { checkRole } = require('../middleware/accessControl.middleware');
// const { getUsers, deleteUser } = require('../controllers/adminController');

const router = express.Router();

router.get('/users', authenticate, checkRole(['admin']), getUsers);
router.delete('/users/:id', authenticate, checkRole(['admin']), deleteUser);

module.exports = router;

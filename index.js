const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('./database/models');
const authRoutes = require('./rest-resources/routes/auth.route');
const employeeRoutes = require('./rest-resources/routes/employee.route');
const departmentRoutes = require('./rest-resources/routes/department.route');
const attendanceRoutes = require('./rest-resources/routes/attendance.route')
const salaryhistoryRoutes = require('./rest-resources/routes/salaryhistory.route')

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/salaryhistory',salaryhistoryRoutes)

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        app.listen(3000, () => console.log('Server running on port 3000'));
    })
    .catch(err => console.error('Database connection failed:', err));

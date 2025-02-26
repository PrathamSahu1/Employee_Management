import express from 'express';
import cors from "cors"
import 'dotenv/config';
import db from './database/models/index.js';
import authRoutes from './rest-resources/routes/auth.route.js'
import employeeRoutes from './rest-resources/routes/employee.route.js'
import departmentRoutes from './rest-resources/routes/department.route.js'
import attendanceRoutes from './rest-resources/routes/attendance.route.js'
import salaryhistoryRoutes from './rest-resources/routes/salaryhistory.route.js'

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

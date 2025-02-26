import salaryHistoryService from '../../services/salaryhistory.service.js';
import { ApiResponse } from '../../errors/apiResponse.js';


 //Controller to add a new salary record.

const addSalaryRecord = async (req, res) => {
    try {
        const { employeeId, amount, paymentDate } = req.body;

        // Validate input
        if (!employeeId || !amount || !paymentDate) {
            return res.status(400).json({ error: 'All fields are required (employeeId, amount, paymentDate)' });
        }

        const salaryRecord = await salaryHistoryService.addSalaryRecord(employeeId, amount, paymentDate);

        res.status(201).json(new ApiResponse(201, salaryRecord, "Salary record added successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};


  //Controller to get all salary records (Admin/Manager).

const getAllSalaryRecords = async (req, res) => {
    try {
        const salaryRecords = await salaryHistoryService.getAllSalaryRecords();
        res.status(200).json(new ApiResponse(201, salaryRecords, "Salary record fetched successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};


 //Controller to get salary records for a specific employee.

const getEmployeeSalaryRecords = async (req, res) => {
    try {
        const employeeId = req.user.employeeId; // Extracted from JWT token

        const salaryRecords = await salaryHistoryService.getEmployeeSalaryRecords(employeeId);
        res.status(200).json(new ApiResponse(201, salaryRecords, "Salary record fetched successfully"));
    } catch (error) {
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};

export default {
    addSalaryRecord,
    getAllSalaryRecords,
    getEmployeeSalaryRecords
};

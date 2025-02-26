import * as authService from '../../services/auth.service.js';
import { ApiResponse } from '../../errors/apiResponse.js';
import logger from '../../utils/logger.js';



const register = async (req, res) => {
    try {
        const result = await authService.registerUser(req.body);
        res.status(201).json(new ApiResponse(201, result, "User registered successfully"));
    } catch (error) {
        logger.error('Error registering user: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.loginUser(email, password);
        res.status(200).json(new ApiResponse(200, result, "Successfully logged in"));
    } catch (error) {
        logger.error('Error logging in: ' + error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
};


export {register,login}
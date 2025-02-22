const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../database/models');
const logger = require('../utils/logger');;
const { ApiError } = require('../errors/apiError');

const secretKey = 'xyz123';


const registerUser = async (userData) => {
    try {
        const { name, email, password, role } = userData;

        // Check if any admin exists
        const adminExists = await User.findOne({ where: { role: 'admin' } });

        if (role === 'admin' && adminExists) {
            throw new ApiError(403, "An admin already exists. Cannot register another admin.");
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new ApiError(400, "Email already registered.");
        }

        // Directly create the user (password will be hashed via model hook)
        const user = await User.create({ name, email, password, role });

        logger.info(`New user registered with id ${user.id}`);
        return { message: 'User registered successfully' };

    } catch (error) {
        logger.error('Error registering user: ' + error.message);

        // Preserve existing status codes; otherwise, default to 500
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Internal server error");
    }
};

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new ApiError(401, 'Invalid credentials');
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

        return { message: "Successfully logged in", token };
    } catch (error) {
        logger.error('Error logging in: ' + error.message);

        // Preserve the original error if it's an instance of ApiError
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError(500, "Internal server error");
    }
};

module.exports = {registerUser, loginUser}

import Ajv from "ajv";
import addFormats from 'ajv-formats'

const ajv = new Ajv();
addFormats(ajv); // Adds support for formats like date-time, email, etc.

const validateSchema = (schema) => {
    return (req, res, next) => {
        const validate = ajv.compile(schema);
        const valid = validate(req.body);

        if (!valid) {
            return res.status(400).json({ error: validate.errors });
        }

        next();
    };
};

export default validateSchema;

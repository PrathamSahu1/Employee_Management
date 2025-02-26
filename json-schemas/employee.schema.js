export default {
    type: "object",
    properties: {
        name: { type: "string", minLength: 3 },
        email: { type: "string", format: "email" },
        phone: { type: "string", pattern: "^[0-9]{10}$" },
        departmentId: { type: "integer" },
        salary: { type: "number", minimum: 10000 }
    },
    required: ["name", "email", "phone", "departmentId", "salary"],
    additionalProperties: false
};

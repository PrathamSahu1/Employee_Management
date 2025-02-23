module.exports = {
    type: "object",
    properties: {
        employeeId: { type: "integer" },
        amount: { type: "number", minimum: 1000 },
        paymentDate: { type: "string", format: "date" }
    },
    required: ["employeeId", "amount", "paymentDate"],
    additionalProperties: false
};

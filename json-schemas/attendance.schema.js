module.exports = {
    type: "object",
    properties: {
        employeeId: { type: "integer", minimum: 1 },
        date: { type: "string", format: "date" },
        status: { type: "string", enum: ["Present", "Absent", "Leave"] }
    },
    required: ["employeeId", "date", "status"],
    additionalProperties: false
};

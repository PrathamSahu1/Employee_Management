module.exports = {
    type: "object",
    properties: {
        
        status: { type: "string", enum: ["Present", "Absent", "Leave"] }
    },
    required: [ "status"],
    additionalProperties: false
};

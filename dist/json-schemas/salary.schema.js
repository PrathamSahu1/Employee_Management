"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  type: "object",
  properties: {
    employeeId: {
      type: "integer"
    },
    amount: {
      type: "number",
      minimum: 1000
    },
    paymentDate: {
      type: "string",
      format: "date"
    }
  },
  required: ["employeeId", "amount", "paymentDate"],
  additionalProperties: false
};
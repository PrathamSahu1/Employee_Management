"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 3
    },
    email: {
      type: "string",
      format: "email"
    },
    password: {
      type: "string",
      minLength: 6
    },
    role: {
      type: "string",
      "enum": ["admin", "manager", "employee"]
    },
    employeeId: {
      type: "integer",
      minimum: 1,
      nullable: true
    }
  },
  required: ["name", "email", "password", "role"],
  additionalProperties: false
};
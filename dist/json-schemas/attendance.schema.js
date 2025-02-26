"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = exports["default"] = {
  type: "object",
  properties: {
    status: {
      type: "string",
      "enum": ["Present", "Absent", "Leave"]
    }
  },
  required: ["status"],
  additionalProperties: false
};
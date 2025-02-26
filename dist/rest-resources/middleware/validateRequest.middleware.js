"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _ajv = _interopRequireDefault(require("ajv"));
var _ajvFormats = _interopRequireDefault(require("ajv-formats"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ajv = new _ajv["default"]();
(0, _ajvFormats["default"])(ajv); // Adds support for formats like date-time, email, etc.

var validateSchema = function validateSchema(schema) {
  return function (req, res, next) {
    var validate = ajv.compile(schema);
    var valid = validate(req.body);
    if (!valid) {
      return res.status(400).json({
        error: validate.errors
      });
    }
    next();
  };
};
var _default = exports["default"] = validateSchema;
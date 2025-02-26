"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../middleware/auth.middleware.js");
var _attendanceController = require("../controllers/attendance.controller.js");
var _validateRequestMiddleware = _interopRequireDefault(require("../middleware/validateRequest.middleware.js"));
var _attendanceSchema = _interopRequireDefault(require("../../json-schemas/attendance.schema.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Employees can mark attendance
router.post('/', _authMiddleware.authenticate, (0, _validateRequestMiddleware["default"])(_attendanceSchema["default"]), _attendanceController.markAttendance);
router.get('/', _authMiddleware.authenticate, _attendanceController.getAttendance);
var _default = exports["default"] = router;
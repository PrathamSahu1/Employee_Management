"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _salaryhistoryController = _interopRequireDefault(require("../controllers/salaryhistory.controller.js"));
var _authMiddleware = require("../middleware/auth.middleware.js");
var _accessControlMiddleware = require("../middleware/accessControl.middleware.js");
var _validateRequestMiddleware = _interopRequireDefault(require("../middleware/validateRequest.middleware.js"));
var _salarySchema = _interopRequireDefault(require("../../json-schemas/salary.schema.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Only Admin & Manager can add salary records
router.post('/', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['admin', 'manager']), (0, _validateRequestMiddleware["default"])(_salarySchema["default"]), _salaryhistoryController["default"].addSalaryRecord);

// Admin & Manager can get all salary records
router.get('/all', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['admin', 'manager']), _salaryhistoryController["default"].getAllSalaryRecords);

// Employees can view their own salary records
router.get('/', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['employee']), _salaryhistoryController["default"].getEmployeeSalaryRecords);
var _default = exports["default"] = router;
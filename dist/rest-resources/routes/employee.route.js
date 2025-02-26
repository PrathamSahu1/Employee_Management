"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _employeeController = require("../controllers/employee.controller.js");
var _authMiddleware = require("../middleware/auth.middleware.js");
var _accessControlMiddleware = require("../middleware/accessControl.middleware.js");
var _validateRequestMiddleware = _interopRequireDefault(require("../middleware/validateRequest.middleware.js"));
var _employeeSchema = _interopRequireDefault(require("../../json-schemas/employee.schema.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.get('/', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['admin', 'manager']), _employeeController.getEmployees);
router.post('/', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['admin', 'manager']), (0, _validateRequestMiddleware["default"])(_employeeSchema["default"]), _employeeController.addEmployee);
router.patch('/:employeeId', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['admin', 'manager']), _employeeController.updateEmployee);
router["delete"]('/:employeeId', _authMiddleware.authenticate, (0, _accessControlMiddleware.checkRole)(['admin', 'manager']), _employeeController.deleteEmployee);
var _default = exports["default"] = router;
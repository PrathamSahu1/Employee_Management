"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../controllers/auth.controller.js");
var _validateRequestMiddleware = _interopRequireDefault(require("../middleware/validateRequest.middleware.js"));
var _userSchema = _interopRequireDefault(require("../../json-schemas/user.schema.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/register', (0, _validateRequestMiddleware["default"])(_userSchema["default"]), _authController.register);
router.post('/login', _authController.login);
// router.delete('/delete', authenticate, deleteUser);
var _default = exports["default"] = router;
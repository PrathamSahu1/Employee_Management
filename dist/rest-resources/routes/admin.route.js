"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _auth = require("../middleware/auth.js");
var _accessControlMiddleware = require("../middleware/accessControl.middleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// const { getUsers, deleteUser } = require('../controllers/adminController');

var router = _express["default"].Router();
router.get('/users', _auth.authenticate, (0, _accessControlMiddleware.checkRole)(['admin']), getUsers);
router["delete"]('/users/:id', _auth.authenticate, (0, _accessControlMiddleware.checkRole)(['admin']), deleteUser);
var _default = exports["default"] = router;
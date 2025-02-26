"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var secretKey = 'xyz123';
var authenticate = exports.authenticate = function authenticate(req, res, next) {
  var authHeader = req.header("Authorization");
  var token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Access Denied. No token provided."
    });
  }
  try {
    var decoded = _jsonwebtoken["default"].verify(token, secretKey);
    req.user = decoded; // Attach user data to the request object
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid token."
    });
  }
};
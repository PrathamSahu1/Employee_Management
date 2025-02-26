"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRole = void 0;
var checkRole = exports.checkRole = function checkRole(roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      console.log("req.user.role", req.user.role);
      return res.status(403).json({
        message: "Access denied. Insufficient permissions."
      });
    }
    next();
  };
};
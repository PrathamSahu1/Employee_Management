"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _winston = require("winston");
var logger = (0, _winston.createLogger)({
  level: 'info',
  format: _winston.format.combine(_winston.format.timestamp(), _winston.format.json()),
  transports: [new _winston.transports.Console(), new _winston.transports.File({
    filename: 'logs/error.log',
    level: 'error'
  })]
});
var _default = exports["default"] = logger;
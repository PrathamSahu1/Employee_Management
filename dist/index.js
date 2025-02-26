"use strict";

var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
require("dotenv/config");
var _index = _interopRequireDefault(require("./database/models/index.js"));
var _authRoute = _interopRequireDefault(require("./rest-resources/routes/auth.route.js"));
var _employeeRoute = _interopRequireDefault(require("./rest-resources/routes/employee.route.js"));
var _departmentRoute = _interopRequireDefault(require("./rest-resources/routes/department.route.js"));
var _attendanceRoute = _interopRequireDefault(require("./rest-resources/routes/attendance.route.js"));
var _salaryhistoryRoute = _interopRequireDefault(require("./rest-resources/routes/salaryhistory.route.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use('/api/employees', _employeeRoute["default"]);
app.use('/api/auth', _authRoute["default"]);
app.use('/api/department', _departmentRoute["default"]);
app.use('/api/attendance', _attendanceRoute["default"]);
app.use('/api/salaryhistory', _salaryhistoryRoute["default"]);
_index["default"].sequelize.authenticate().then(function () {
  console.log('Database connected');
  app.listen(3000, function () {
    return console.log('Server running on port 3000');
  });
})["catch"](function (err) {
  return console.error('Database connection failed:', err);
});
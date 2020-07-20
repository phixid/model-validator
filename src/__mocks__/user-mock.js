'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
    return r;
  };
exports.__esModule = true;
exports.mockUserWithAddress = exports.mockUser = exports.mockUserWithAddressModel = exports.mockUserModel = void 0;
var address_mock_1 = require('./address-mock');
var ModelValidator_1 = require('../utils/validation/ModelValidator');
exports.mockUserModel = [
  { key: 'firstname', required: true, type: ModelValidator_1.Primitives.String },
  { key: 'lastname', required: true, type: ModelValidator_1.Primitives.String },
  { key: 'email', required: true, type: ModelValidator_1.Primitives.String },
  { key: 'phone', type: ModelValidator_1.Primitives.String },
];
exports.mockUserWithAddressModel = __spreadArrays(exports.mockUserModel, [
  { key: 'address', required: true, type: 'object', model: address_mock_1.mockAddressModel },
]);
exports.mockUser = {
  firstname: 'Kristof',
  lastname: 'Hermans',
  email: 'kristof.hermans@golden-giraffes.be',
};
exports.mockUserWithAddress = __assign(__assign({}, exports.mockUser), { address: address_mock_1.mockAddress });

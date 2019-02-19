'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var dateISOString = exports.dateISOString = new Date(+new Date() + 864e5).toISOString();
var xAmzDate = exports.xAmzDate = dateISOString.split('-').join('').split(':').join('').split('.').join('');
var dateYMD = exports.dateYMD = dateISOString.split('T')[0].split('-').join('');
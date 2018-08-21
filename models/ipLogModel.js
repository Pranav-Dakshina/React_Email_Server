"use strict";

var mongoose = require('mongoose');

var ipLogSchema = {
  id: String,
  ip: String,
  timestamp: Date
};

var ipLogModel = mongoose.model('ipLogModel', ipLogSchema, 'ipLog');

module.exports = ipLogModel;

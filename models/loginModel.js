"use strict";

var mongoose = require('mongoose');

var loginSchema = {
  firstname: String,
  lastname: String,
  username: String,
  password: String,
};

var loginModel = mongoose.model('loginModel', loginSchema, 'login');

module.exports = loginModel;

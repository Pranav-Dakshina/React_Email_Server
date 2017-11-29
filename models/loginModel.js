"use strict";

var mongoose = require('mongoose');

var loginSchema = {
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  img: { data: Buffer, contentType: String },
};

var loginModel = mongoose.model('loginModel', loginSchema, 'login');

module.exports = loginModel;

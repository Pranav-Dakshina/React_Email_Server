let mongoose = require('mongoose');
let loginModel = require('./models/loginModel.js');
let bcrypt = require('bcrypt');

mongoose.connection.db.dropDatabase();

var pass = bcrypt.hashSync('pranav', 10);

var initial = [
{
  firstname: "Pranav",
  lastname: "Dakshinamurthy",
  username: "pranav",
  password: pass,
}];

initial.forEach(function(user)
{
  new loginModel(user)
    .save();
});

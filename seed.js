let mongoose = require('mongoose');
let fs = require('fs');
let loginModel = require('./models/loginModel.js');
let bcrypt = require('bcrypt');

mongoose.connection.db.dropDatabase();

var pass = bcrypt.hashSync('Linode@2210', 10);
var pass2 = bcrypt.hashSync('pass', 10);
//var pass3 = bcrypt.hashSync('Shanu*525', 10);

var initial = [
{
  firstname: "Pranav",
  lastname: "Dakshinamurthy",
  username: "pranav@thabpet.com",
  password: pass,
  img: {
    data: fs.readFileSync('./public/images/me.jpg'),
    contentType: 'image/jpeg',
  }
},
{
  firstname: "Test",
  lastname: "Test",
  username: "test@thabpet.com",
  password: pass2,
  img: {
    data: fs.readFileSync('./public/images/me.jpg'),
    contentType: 'image/jpeg',
  }
},
{
  firstname: "Email",
  lastname: "Email",
  username: "email@thabpet.com",
  password: pass2,
  img: {
    data: fs.readFileSync('./public/images/me.jpg'),
    contentType: 'image/jpeg',
  }
}];

initial.forEach(function(user)
{
  new loginModel(user)
    .save();
});

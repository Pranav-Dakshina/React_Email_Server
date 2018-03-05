module.exports = function(app)
{
  const LoginModel = require("./../models/loginModel.js");
  const bcrypt = require('bcrypt');
  const sql = require('mysql');
  const nodemailer = require('nodemailer');
  const axios = require('axios');

  app.route('/submitSignUp')
    .post(function(req, res)
    {
      let pass = bcrypt.hashSync(req.body.password, 10);
      let user = req.body.username + '@thabpet.com'
      let data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: user,
        password: pass
      }
      LoginModel(data)
        .save()
        .then((results) =>
        {
          console.log("Submitted successfully");
          var con = sql.createConnection({
            host: 'thabpet.com',
            user: 'Nero',
            password: 'Mysql@2210',
            database: 'servermail'
          });

          con.connect((err) => {
             // if (err.length > 0) {
              console.log(err);
             // }
          });

          con.query('INSERT INTO virtual_users (domain_id, password , email) VALUES(1, ENCRYPT(?, CONCAT(\'$6$\', SUBSTRING(SHA(RAND()), -16))), ?);',
          [req.body.password, user],
          (error, results) => {
             console.log("Error: ", error);
             if(!error) {
               nodemailer.createTestAccount((err) =>
               {
                 // create reusable transporter object using the default SMTP transport
                 let transporter = nodemailer.createTransport(
                 {
                   host: 'thabpet.com',
                   port: 587,
                   secure: false, // true for 465, false for other ports
                   auth:
                   {
                     user: 'pranav@thabpet.com', // generated ethereal user
                     pass: 'Linode@2210', // generated ethereal password
                   }
                 });

                 let To = data.username + '@thabpet.com'
                 let mailOptions = {
                   to: To,
                   from: 'admin@thabpet.com',
                   subject: 'Welcome to Thabpet',
                   text: '<p>Welcome to Thabpet</p><p>Thanks and Regards</p><p>Pranav Dakshinamurthy</p>'
                 };
                 // send mail with defined transport object
                 transporter.sendMail(mailOptions, (error, info) =>
                 {
                   if (error)
                   {
                     return console.log(error);
                   }
                   console.log('Message sent: %s', info.messageId);
                   // Preview only available when sending through an Ethereal account
                   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

                 });
               });
               let dbSend = {
                 username: user,
                 password: req.body.password
               }
               app.post('http://localhost:8080/auth/signin',function(req, res) {
                 res.send(dbSend)
               })
               let dbOut = {
                 submitted: true,
               }
               res.json(dbOut);
            } else {
              console.log(error);
            }
          });
        })
        .catch((error) =>
        {
          console.log("Submission failed");
          console.log(error);
        });
    });


}

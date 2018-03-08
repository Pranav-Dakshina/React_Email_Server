module.exports = function(app)
{
  var LoginModel = require("./../models/loginModel.js");
  var bcrypt = require('bcrypt');
  var passport = require('passport');

  const nodemailer = require('nodemailer');

  app.route('/auth/signin')
    .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            // console.log("req.user: ",req.user);
            res.cookie('uid', req.user.id);
            var dbOut = {
              content: req.user,
              verify: true,
            }
            res.json(dbOut);
        }
    );

  app.route('/verifyUser')
    .post(function(req, res)
    {
      LoginModel.find(
        {
          username: req.body.user
        })
        .then((results) =>
        {
          if (results.length)
          {
            let dbOut = {
              available: false,
            }
            res.json(dbOut);
          }
          else
          {
            let dbOut = {
              available: true,
            }
            res.json(dbOut);
          }
        })
        .catch((error) =>
        {
          console.log("Retrieved failed");
          console.log(error);
        });
    });

  app.route('/auth/:user/profilePic')
    .get(function(req, res)
    {
      // console.log(res.cookies.uid);
      LoginModel.find(
        {
          username: req.params.user
        })
        .then((results) =>
        {
          // console.log("Success");
          // console.log(results[0]);
          // res.setHeader('content-type', 'image/jpeg');
          res.end(results[0].img.data);
        }, (error) =>
        {
          console.log("Retrieved failed");
          console.log(error);
        });
    });

  app.route('/auth/sendmail')
    .post(function(req, res)
    {
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
            user: 'test@thabpet.com', // generated ethereal user
            pass: 'pass', // generated ethereal password
          }
        });

        let mailOptions = req.body;
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
          res.status(200)
             .send();
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });
      });

    });

  app.route('/auth/signout')
    .post(function(req, res)
    {
      var content = [];
      res.status(200)
        .send();
    });

  app.get('/mail', function(req, res)
  {
    res.render('index');
  });

}

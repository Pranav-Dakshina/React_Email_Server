
module.exports = function(app)
{
  const LoginModel = require("./../models/loginModel.js");
  const IpLogModel = require("./../models/ipLogModel.js");
  // const bcrypt = require('bcrypt');
  const passport = require('passport');
  // const fs = require('fs');

  const nodemailer = require('nodemailer');
  let transporter = {};
  // import imagesUpload from 'images-upload-middleware';

  app.route('/auth/signin')
    .post(function(req, res) {
            passport.authenticate('local',
            function(err, user, info) {
              let ip = req.headers['x-forwarded-for'] ||
                         req.connection.remoteAddress ||
                         req.socket.remoteAddress
              if(ip == '::1') {
                ip = '127.0.0.1'
              } else {
                ip = ip.split(':')
                ip = ip[3]
              }

              const date = new Date()
              const data = {
                id: user.id,
                ip: ip,
                timestamp: date
              }

              // NOTE : need to change this soon
              if(user) {
                res.cookie('uid', user.id);
                console.log("Req.session : ", req.session);
                transporter = nodemailer.createTransport(
                {
                  host: 'thabpet.com',
                  port: 465,
                  secure: true, // true for 465, false for other ports
                  auth: req.body
                });

                IpLogModel(data)
                  .save()
                  .then((results) => {
                    if(results) {
                      // console.log("Results : ", results);
                    } else {
                      console.log("Error");
                    }
                  })
                  .catch((error) =>
                  {
                    console.log("IP submit failed : ", error);
                  });

                res.json({
                  content: user.content,
                  verify: true,
                  message: "",
                  firstname: user.firstname,
                  lastname: user.lastname
                });
              } else {
                res.json({
                  content: [],
                  verify: false,
                  message: info
                });
              }
            })(req, res);
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
          // console.log("Buffer : ", results[0].img.data);
          res.end(results[0].img.data);
        }, (error) =>
        {
          console.log("Retrieved failed");
          console.log(error);
        });
    });

  app.route('/chgDp')
    .post(function(req, res)
    {
      console.log("Req.session : ",req.session);
      console.log("User Id : ",req.session.user.id);
      // const tCast = req.body.toString('base64');
      console.log("buffer : ", req.files);
      const { file } = req.files
      const data = {
         img: {
          data: file.data,
          contentType: file.mimetype,
          name: file.name,
          encoding: file.encoding,
          md5: file.md5
        }
      }

      LoginModel.update({ _id: req.session.user.id}, data, function(err, raw){
        if (err) {
          console.log("Error : ", err);
          res.send(err);
        }
        console.log("Success : ", raw);
        // res.send(raw);
      })
      res.status(200).send();
    });

  app.route('/auth/sendmail')
    .post(function(req, res)
    {
      // create reusable transporter object using the default SMTP transport
      // console.log("Transporter: ", transporter);
      let mailOptions = req.body;
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) =>
      {
        if (error)
        {
          return console.log("Trasnporter Error : ", error);
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

  app.route('/auth/signout')
    .post(function(req, res)
    {
      res.status(200)
         .send();
    });

  app.get('/mail', function(req, res)
  {
    res.render('index');
  });

  app.get('/*', function(req, res)
  {
    res.render('index');
  });


}

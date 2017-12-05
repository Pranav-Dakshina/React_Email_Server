
module.exports = function(app)
{
  var LoginModel = require("./../models/loginModel.js");
  var bcrypt = require('bcrypt');
  var IMAPserver = require('imap');
  const MailParser = require('mailparser').MailParser;
  var inspect = require('util').inspect;
  const nodemailer = require('nodemailer');

  var content = [];
  let mailmsg = {};
  // let transporter = {};

  app.route('/auth/signin')
    .post(function(req, res)
    {
      LoginModel.find(
        {
          username: req.body.user
        })
        .then((results) => {
          // console.log(results);
          // console.log(req.body);
          if (bcrypt.compareSync(req.body.pass, results[0].password))
          {
            console.log("Retrieved successfully");
            // var dbOut = {
            //   id: results[0]._id,
            //   img: results[0].img,
            // }

            var imap = new IMAPserver({
                user: req.body.user,
                password: req.body.pass,
                host: 'thabpet.com',
                port: 993,
                tls: true
              });

            var content = [];
            function openInbox(cb) {
                imap.openBox('INBOX', true, cb);
              }

              imap.once('ready', function() {
                // openInbox(function(err, box) {
                //   if (err) throw err;
                //   var f = imap.seq.fetch(box.messages.total + ':1', {
                //     bodies: [''],
                //     struct: true
                //   });
                //   f.on('message', function(msg, seqno) {
                //     var prefix = '(#' + seqno + ') ';
                //     console.log('message');
                //     msg.on('body', function(stream, info) {
                //       var mp = new MailParser();
                //
                //       mp.on('headers', function(mail) {
                //         console.log('headers');
                //         var mailmsg = {};
                //
                //         var to = {};
                //         to["address"] = mail.get('to').value[0].address;
                //         to["name"] = mail.get('to').value[0].name;
                //
                //         mailmsg["to"] = to;
                //
                //         var from = {};
                //         from["address"] = mail.get('from').value[0].address;
                //         from["name"] = mail.get('from').value[0].name;
                //
                //         mailmsg["from"] = from;
                //
                //         if (mail.has('subject')) {
                //           mailmsg["subject"] = mail.get('subject');
                //         } else {
                //           mailmsg["subject"] = "No Subject";
                //         }
                //
                //         content.push(mailmsg);
                //       });
                //
                //       stream.pipe(mp);
                //     });
                //
                //     msg.once('attributes', function(attrs) {
                //       // attrs here is an *object* containing email metadata
                //     });
                //
                //     msg.on('end', function() {
                //       console.log('Done fetching all messages');
                //       // imap.end();
                //     });
                //
                //   });
                //
                //   f.once('error', function(err) {
                //     // console.log('Fetch error: ' + err);
                //   });
                //
                //   f.once('end', function() {
                //     console.log('Done fetching all messages!');
                //      imap.end();
                //   });
                //
                // });

                openInbox(function(err, box) {
                  if (err) throw err;
                  var f = imap.seq.fetch(box.messages.total + ':1', { bodies: ['HEADER.FIELDS (FROM TO DATE SUBJECT)','TEXT'] });
                  f.on('message', function(msg) {
                    let mailmsg = {};
                    msg.on('body', function(stream, info) {
                      var b = '';
                      stream.on('data', function(d) {
                        b += d;
                      });
                      stream.on('end', function() {
                        if (/^header/i.test(info.which)) {
                          mailmsg["header"] = IMAPserver.parseHeader(b);
                          // console.log('Header: ', mailmsg);
                        } else {
                          mailmsg["body"] = b;
                          // console.log('Body: ', mailmsg);
                        }
                      });
                    });
                    msg.on('attributes', function(attrs) {
                      mailmsg["attrs"] = attrs;
                      // console.log('b4 push ', mailmsg);
                      // msg.contentType = partID[1];
                      // console.log('b4 push ', mailmsg);
                      content.push(mailmsg);
                    });
                  });
                  f.on('end', function() {
                    console.log('Done fetching all messages!');
                    imap.end();
                  });
                });
              });

              imap.once('error', function(err) {
                console.log(err);
              });

              imap.once('end', function() {
                // console.log('af push',content);
                console.log('Cction ended');
                console.log('Client Ip : ', req.ip);
                res.cookie('uid', results[0]._id);
                var dbOut = {
                  content: content,
                  verify: true,
                }
                res.json(dbOut);
              });

              imap.connect();

          } else {
            console.log("Retrieved but password does not match");
            var ip = ((req.headers['x-forwarded-for'] || '').split(',')[0]
        || req.connection.remoteAddress);
            console.log('Client Ip : ', ip);
            var dbOut = {
              content: null,
              verify: false,
            }
            res.send(dbOut);
          }
        })
        .catch((error) => {
            console.log("Retrieved failed");
            console.log('Client Ip : ', req.ip);
            // console.log(results[0].password);
            var dbOut = {
              content: null,
              verify: false,
            }
            res.send(dbOut);
            //  done(null, false, {message: 'Bad password'});
        });
    });

  app.route('/verifyUser')
    .post(function(req, res)
    {
      LoginModel.find(
        {
          username: req.body.user
        })
        .then((results) => {
          if(results.length) {
            let dbOut = {
              available: false,
            }
            res.json(dbOut);
          } else {
            let dbOut = {
              available: true,
            }
            res.json(dbOut);
          }
        })
        .catch((error) => {
          console.log("Retrieved failed");
          console.log(error);
        });
    });

  app.route('/submitSignUp')
    .post(function(req, res)
    {
      LoginModel(req.body).save()
        .then((results) => {
          console.log("Submitted successfully");
          console.log(results);
          let dbOut = {
            submitted: true,
          }
          res.json(dbOut);
        })
        .catch((error) => {
          console.log("Submission failed");
          console.log(error);
        });
    });

  app.route('/auth/:user/profilePic')
    .get(function(req, res)
    {
      // console.log(res.cookies.uid);
      LoginModel.find({ username: req.params.user })
        .then((results) => {
          console.log("Success");
          // console.log(results[0]);
          // res.setHeader('content-type', 'image/jpeg');
          res.end(results[0].img.data);
        })
        .catch((error) => {
          console.log("Retrieved failed");
          console.log(error);
        });
    });

  app.route('/auth/sendmail')
    .post(function(req, res)
    {
          nodemailer.createTestAccount((err) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
                host: 'thabpet.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'test@thabpet.com', // generated ethereal user
                    pass: 'pass',  // generated ethereal password
                }
            });

            let mailOptions = req.body;
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                  return console.log(error);
              }
              console.log('Message sent: %s', info.messageId);
              // Preview only available when sending through an Ethereal account
              console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
              res.status(200).send();
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
          });
        // setup email data with unicode symbols
        // let mailOptions = {
        //     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
        //     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
        //     subject: 'Hello ✔', // Subject line
        //     text: 'Hello world?', // plain text body
        //     html: '<b>Hello world?</b>' // html body
        // };

    });

  app.route('/auth/signout')
    .post(function(req, res)
    {
      var content = [];
      res.status(200).send();
    });

  // app.route('/auth/sendmail')
  //   .post(function(req, res)
  //   {
  //     console.log('Success');
  //     res.status(200).send();
  //   });

  app.get('/mail', function(req, res)
    {
      res.render('index');
    });

}

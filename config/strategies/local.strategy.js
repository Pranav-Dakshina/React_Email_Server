var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
var LoginModel = require("./../../models/loginModel.js");
var bcrypt = require('bcrypt');


module.exports = function() {
    passport.use(new LocalStrategy({
        usernameField: 'user',
        passwordField: 'pass'
    },
    function(username, password, done) {
      LoginModel.find(
        {
          username: username
        })
        .then((results) =>
        {
          if (bcrypt.compareSync(password, results[0].password))
          {
            console.log("Retrieved successfully");
            var IMAPserver = require('imap');
            const MailParser = require('mailparser')
              .MailParser;
            const simpleParser = require('mailparser')
              .simpleParser;
            var inspect = require('util')
              .inspect;
            const imap = new IMAPserver({
              user: 'test@thabpet.com',
              password: 'pass',
              host: 'thabpet.com',
              port: 993,
              tls: true
            });

            function openInbox(cb) {
              imap.openBox('INBOX', true, cb);
            }

            var content = [];
            imap.once('ready', function() {
              console.log('ready');
              openInbox(function(err, box) {
                if (err) throw err;
                var f = imap.seq.fetch(box.messages.total + ':1', {
                  bodies: [''],
                  struct: true
                });
                f.on('message', function(msg, seqno) {
                  var prefix = '(#' + seqno + ') ';
                  console.log('message');
                  let mailmsg = {};
                  msg.on('body', function(stream, info) {
                    var mp = new MailParser();

                    mp.on('data', data => {
                        var body = {};
                        if(data.type === 'text'){
                          // console.log('Text : ' ,data.text);
                          // console.log('HTML : ' ,data.html);
                          // console.log('TextAsHtml : ' ,data.textAsHtml);
                          body["html"] = data.html;
                          body["text"] = data.text;
                          body["textAsHtml"] = data.textAsHtml;
                        }
                        mailmsg["body"] = body;

                        if(data.type === 'attachment'){
                            // console.log(data.filename);
                            // data.content.pipe(process.stdout);
                            // data.content.on('end', ()=>data.release());
                        }
                    });

                    mp.on('headers', function(mail) {
                      // console.log('headers');

                      // var to = {};
                      // to["address"] = mail.get('to').value[0].address;
                      // to["name"] = mail.get('to').value[0].name;

                      mailmsg["to"] = mail.get('to').text;

                      // var from = {};
                      // from["address"] = mail.get('from').value[0].address;
                      // from["name"] = mail.get('from').value[0].name;

                      mailmsg["from"] = mail.get('from').text;

                      if (mail.has('subject')) {
                        mailmsg["subject"] = mail.get('subject');
                      } else {
                        mailmsg["subject"] = "No Subject";
                      }

                    });

                    stream.pipe(mp);
                  });

                  msg.once('attributes', function(attrs) {
                    // attrs here is an *object* containing email metadata
                    mailmsg["attrs"] = attrs;
                    content.push(mailmsg);
                    // console.log('Content : ',content);
                  });

                  msg.on('end', function() {
                    // console.log('Done fetching all messages');
                    // imap.end();
                  });

                });

                f.once('error', function(err) {
                  // console.log('Fetch error: ' + err);
                });

                f.once('end', function() {
                  // console.log('Done fetching all messages!');
                   imap.end();
                });

              });

            });

            imap.once('error', function(err)
            {
              console.log(err);
            });

            imap.once('end', function()
            {
              // console.log('af push',content);
              // console.log('Cction ended');
              console.log('Client Ip : ', req.ip);
              res.cookie('uid', results[0]._id);
              var user = {
                content: content,
                verify: true,
              }
              done(null, user);
            });

            // imap.connect();
          }
          else {
             done(null, false, {message: 'Bad password'});
          }
        })
        .catch((error) =>
        {
          console.log("Retrieved failed");
          console.log('Client Ip : ', req.ip);
          // console.log(results[0].password);

           done(null, false, {message: 'Incorrect username and password'});
        });
    }));
};

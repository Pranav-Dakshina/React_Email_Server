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
            var MailListener = require("mail-listener4");
            let content = [];
            let total = 0;
            let count = 0;

            var mailListener = new MailListener({
              username: username,
              password: password,
              host: "thabpet.com",
              port: 993, // imap port
              tls: true,
              connTimeout: 10000, // Default by node-imap
              authTimeout: 5000, // Default by node-imap,
              debug: null, // Or your custom function with only one incoming argument. Default: null
              tlsOptions: { rejectUnauthorized: false },
              mailbox: "INBOX", // mailbox to monitor
              searchFilter: ["ALL"], // the search filter being used after an IDLE notification has been retrieved
              markSeen: true, // all fetched email willbe marked as seen and not fetched next time
              fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
              mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
              attachments: true, // download attachments as they are encountered to the project directory
              attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments
            });

            mailListener.start(); // start listening

            // stop listening
            //mailListener.stop();

            mailListener.on("server:connected", function(){
              console.log("imapConnected");
            });

            mailListener.on("mailbox", function(mailbox){
              // console.log("Mailbox: ", mailbox.messages.total);
              total = mailbox.messages.total
            });

            mailListener.on("server:disconnected", function(){
              console.log("imapDisconnected");
            });

            mailListener.on("error", function(err){
              console.log(err);
            });

            mailListener.on("attachment", function(attachment){
              console.log(attachment.path);
            });

            mailListener.on("mail", function(mail, seqno, attributes){
              // do something with mail object including attachments
              // console.log("HTML :", mail.html);
              // console.log("To :", mail.to);
              // console.log("from :", mail.from);
              // console.log("SUB :", mail.subject);
              // console.log("seqno: ", seqno);
              // console.log("attributes: ", attributes);
              // mail processing code goes here
              let mailmsg = {
                to: mail.to,
                from: mail.from,
                subject: mail.subject,
                html: mail.html,
                id: results[0]._id
              }
              content.push(mailmsg)
              ++count;
              if(count == total) {
                mailListener.stop()
                done(null, content);
              }
            });
            // it's possible to access imap object from node-imap library for performing additional actions. E.x.
            // mailListener.imap.move(:msguids, :mailboxes, function(){})
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

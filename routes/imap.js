exports.imapFunc = function(req, res) {
    const IMAPserver = require('imap');
    const MailParser = require('mailparser')
      .MailParser;
    const simpleParser = require('mailparser')
      .simpleParser;
    const inspect = require('util')
      .inspect;

    const parser = new MailParser();

    var content = [];
    let mailmsg = {};
    // let transporter = {};

    console.log("Retrieved successfully");
    console.log(req.body.user);
    console.log(req.body.pass);

    var imap = new IMAPserver({
      user: req.body.user,
      password: req.body.pass,
      host: 'thabpet.com',
      port: 993,
      tls: true
    });

    var content = [];
    // function openInbox(cb) {
    //      cb);
    //   }

    imap.once('ready', function() {
      imap.openBox('INBOX', true, function(err, box) {
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
                  console.log('Text : ' ,data.text);
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

      // imap.openBox('INBOX', true, function(err, box) {
      //   if (err) throw err;
      //   var f = imap.seq.fetch(box.messages.total + ':1',
      //   {
      //     bodies: ['HEADER.FIELDS (FROM TO DATE SUBJECT)', 'TEXT']
      //   });
      //   f.on('message', function(msg)
      //   {
      //     let mailmsg = {};
      //     msg.on('body', function(stream, info)
      //     {
      //       var b = '';
      //       stream.on('data', function(d)
      //       {
      //         b += d.toString();
      //
      //       });
      //       parser.on('data', data =>
      //       {
      //         if (data.type === 'text')
      //         {
      //           console.log(data.html);
      //         }
      //       });
      //       stream.on('end', function()
      //       {
      //         if (/^header/i.test(info.which))
      //         {
      //           mailmsg["header"] = IMAPserver.parseHeader(b);
      //           // console.log('Header: ', mailmsg);
      //         }
      //         else
      //         {
      //           var body = {};
      //           console.log('Body: ', b);
      //           console.log('  ');
      //           simpleParser(b, (err, mail) =>
      //           {
      //             // console.log('Mail HTML : ', mail.html);
      //             // console.log('Mail TEXT : ', mail.text);
      //             // console.log('Mail Text/HTML : ', mail.textAsHtml);
      //             body["html"] = mail.html;
      //             body["text"] = mail.text;
      //             body["textAsHtml"] = mail.textAsHtml;
      //             // console.log(mailmsg.body);
      //           });
      //           mailmsg["body"] = body;
      //         }
      //       });
      //     });
      //     msg.on('attributes', function(attrs)
      //     {
      //       mailmsg["attrs"] = attrs;
      //       // console.log('b4 push ', mailmsg);
      //       // msg.contentType = partID[1];
      //       // console.log('b4 push ', mailmsg);
      //       content.push(mailmsg);
      //     });
      //   });
      //   f.on('end', function()
      //   {
      //     // console.log('Done fetching all messages!');
      //     imap.end();
      //   });
      // });
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

      var dbOut = {
        content: content,
        verify: true,
      }
      res.cookie('uid', results[0]._id);
      res.json(dbOut);
    });

    // imap.connect();

}

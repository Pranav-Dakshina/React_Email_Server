
module.exports = function(app)
{
  var LoginModel = require("./../models/loginModel.js");
  var bcrypt = require('bcrypt');

  app.route('/auth/signin')
    .post(function(req, res)
    {
      // var loginDetails = new LoginModel(req.body)
      // console.log(req);
      LoginModel.find(
        {
          username: req.body.user
        })
        .then((results) => {
          console.log(results);
          // console.log(req.body);
          if (bcrypt.compareSync(req.body.pass, results[0].password))
          {
            console.log("Retrieved successfully");
            var dbOut = {
              id: results[0]._id,
            }
            res.json(dbOut);
          } else {
            console.log("Retrieved but password does not match");
            var dbOut = {
              id: null,
            }
            res.json(dbOut);
          }
        })
        .catch((error) => {
            console.log("Retrieved failed");
            // console.log(results[0].password);
            res.send(error);
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
          // console.log("Retrieved successfully");
          // console.log(results);
          if(results.length) {
            // console.log(req.body);
            let dbOut = {
              available: false,
            }
            res.json(dbOut);
          }
          else {
            // console.log("Username available");
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

}

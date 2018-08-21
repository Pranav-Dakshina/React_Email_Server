
module.exports = function(app)
{
  app.route('/sessReset')
    .post( function(req, res) {
      req.session.reset();
      console.log("Session : ", req.session);
      res.status(200).send();      
      }
    );
}

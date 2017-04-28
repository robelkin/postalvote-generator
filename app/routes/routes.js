module.exports = function(app) {

  var postHelpers = require('../helpers/post_helper');

  app.post('/postalvote', (req, res) => {
      //console.log(req.body)

      postHelpers.validatePost(req, res);

      req.getValidationResult().then(function(result) {
        if (!result.isEmpty()) {
          //res.status(400).send('There have been validation errors: ');
          res.status(400).json(result.mapped());
          return;
        }
        else {
          res.json({"result":"ok"});
        }
      });
  });

};

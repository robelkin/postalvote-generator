module.exports = function(app) {

  var postHelpers = require('../helpers/post_helper');
  var pdfGenerator = require('../helpers/pdf');
  var path = require('path');

  app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.resolve("views/index.html"));
  });

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
          //res.writeHead(200, {'Content-Type': 'application/json'});
          urlReturned = pdfGenerator.generatePdf(res, req.body);
          res.status(200).json({"url": urlReturned});
          //console.log(req.body);
          res.end();
        }
      });
  });

};

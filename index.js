require('@google-cloud/debug-agent').start();

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const validator      = require('express-validator');

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator([]));
app.use(express.static('public'));

require('./app/routes')(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});

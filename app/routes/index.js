const postalRoutes = require('./routes');
module.exports = function(app) {
  postalRoutes(app);
  // Other route groups could go here, in the future

};

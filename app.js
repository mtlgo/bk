var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var path = require('path');
module.exports = app;

var config = {
  appRoot: path.join(__dirname, 'src')
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }
  swaggerExpress.register(app);
  var port = process.env.PORT || 3000;
  app.listen(port);
});

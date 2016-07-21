var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();
var path = require('path');
module.exports = app;

var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // enable swagger ui
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  
  swaggerExpress.register(app);
  var port = process.env.PORT || 3000;
  app.listen(port);
});

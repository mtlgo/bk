'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var express = require('express');
var app = express();
var path = require('path');
module.exports = app;

var config = {
  appRoot: path.join(__dirname,"/server")
};

app.use(express.static(__dirname + '/client'));
app.get('/', function(req, res){
  res.redirect('/index.html');
});
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // enable swagger ui
  app.use(SwaggerUi(swaggerExpress.runner.swagger));
  
  swaggerExpress.register(app);
  var port = process.env.PORT || 3000;
  app.listen(port);

});

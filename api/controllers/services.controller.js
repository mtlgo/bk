'use strict';

module.exports = {
  services: getAllServices
};


function getAllServices(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  let services = [];

  // this sends back a JSON response which is a single string
  res.json(services);
}

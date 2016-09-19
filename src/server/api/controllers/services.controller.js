'use strict';
var DockerService = require('../services/docker.service');
var docker;

function init(env) {
    let host = env.npm_config_docker_host;
    let port = env.npm_config_docker_port;
    docker = new DockerService(host,port);
}

init(process.env);

module.exports = {
  services: getAllServices
};


function getAllServices(req, res) {
    return docker.service.ls()
                .then(services =>  res.json(services))
                .catch( err => res.send(err));
}

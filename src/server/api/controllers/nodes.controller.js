'use strict';
var DockerService = require('../services/docker.service');
var docker;

function init(env) {
    let host = env.npm_config_docker_host;
    let port = env.npm_config_docker_port;
    let docker_machine = env.npm_config_docker_machine;
    docker = new DockerService(host,port);
}

init(process.env);

module.exports = {
  nodes: getAllNodes
};

function getAllNodes(req, res) {
    return docker.node.ls()
                .then(nodes =>  res.json(nodes))
                .catch( err => res.send(err));
}


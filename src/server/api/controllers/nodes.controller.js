'use strict';
var Docker = require('dockerode');
var docker = getDockerClientFromEnv(process.env);
function getDockerClientFromEnv(env) {
    let docker = {};
    let host = env.npm_config_docker_host;
    let port = env.npm_config_docker_port || 2375;
    let dockerMachineName = env.npm_config_docker_machine;
    if (!host) {
        console.log("Connecting the docker client to", "/var/run/docker.sock");
        docker = new Docker({ socketPath: '/var/run/docker.sock' });
    } else {
        if (!dockerMachineName) {
            console.log("Connecting the docker client to", host);
            docker = new Docker({ host: host, port: port });
        }
        else {
            
        }

    }
    return docker;
}

module.exports = {
  nodes: getAllNodes
};

function getAllNodes(req, res) {
  let nodeInfos = [];
  docker.listNodes(function (err, nodes) {
        if (!err) {
             nodes.forEach(function (nodeInfo) {
                nodeInfos.push(nodeInfo)
            });
            res.json(nodeInfos);
        } else {
            res.send(err);
        }
    });
  
}


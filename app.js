var express = require('express');
var Docker = require('dockerode');
var _ = require('lodash');

var app = express();
var docker = getDockerClientFromEnv(process.env);

app.get('/', function (req, res) {
    let containersInfos = [];
    let nodeInfos = [];
    let extractProperties = ['Id', 'Names', 'Image', 'Ports', 'Command', 'Status']
    docker.listNodes(function (err, nodes) {
        if (!err) {
           /* containers.forEach(function (containerInfo) {
                containersInfos.push(_.pick(containerInfo, extractProperties))
            });*/
             nodes.forEach(function (nodeInfo) {
                nodeInfos.push(nodeInfo)
            });
            res.send(nodeInfos);
        } else {
            res.send(err);
        }
    });


});

app.listen(3000, function () {
    console.log('Docker Swarm UI is available on port 3000 !');
});

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
            
          /*  docker = new Docker({
                protocol: 'https',
                host: host,
                port: process.env.DOCKER_PORT || 2375,
                ca: fs.readFileSync('ca.pem'),
                cert: fs.readFileSync('cert.pem'),
                key: fs.readFileSync('key.pem')
            });*/
        }

    }
    return docker;
}
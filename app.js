var express = require('express');
var Docker = require('dockerode');
var _ = require('lodash'); 

var app = express();
var docker = getDockerClientFromEnv(process.env);

app.get('/', function (req, res) {
    let containersInfos = [];
    let extractProperties = ['Id','Names','Image','Ports','Command','Status']
    docker.listContainers(function (err, containers) {
        if(!err){            
            containers.forEach(function (containerInfo) {
                containersInfos.push(_.pick(containerInfo,extractProperties))
            });
            res.send(containersInfos);
        }else{
            res.send(err);
        }
    });
    

});

app.listen(3000, function () {
  console.log('Docker Swarm UI is available on port 3000 !');
});

function getDockerClientFromEnv(env){
    let docker={};
    let host = env.npm_config_docker_host;
    let port = env.npm_package_config_port || 2375;
    if(!host){
        console.log("Connecting the docker client to", "/var/run/docker.sock");
        docker = new Docker({socketPath: '/var/run/docker.sock'});
    }else{      
        console.log("Connecting the docker client to", host);
        docker = new Docker({host: host, port:port});
    }
    return docker;
}
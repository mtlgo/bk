var express = require('express');
var Docker = require('dockerode');
var _ = require('lodash'); 

var app = express();
var docker = new Docker({host: 'http://10.0.75.2', port: 2375});

app.get('/', function (req, res) {
    let containersInfos = [];
    let extractProperties = ['Id','Names','Image','Ports','Command','Status']
    docker.listContainers(function (err, containers) {
        containers.forEach(function (containerInfo) {
            containersInfos.push(_.pick(containerInfo,extractProperties))
        });
        res.send(containersInfos);
    });
    

});

app.listen(3000, function () {
  console.log('Docker Swarm UI is available on port 3000');
});
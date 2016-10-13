'use strict';
var fs = require('fs');
var Docker = require('dockerode-promise');
function DockerService(host, port) {
    let docker = new Docker({ socketPath: '/var/run/docker.sock' });
    let service = {
        host:host,
        port: port,
        node : {
            ls : getListNodes
        },
        service:{
            ls: getListServices,
            ps: getServiceTasks
        }
    };
    
    function init(){
        if(service.host){
            console.log("Connecting the docker client to", service.host);
            if(service.port){
                 docker = new Docker({ host: host, port: port });
            }
            else{
                                            console.log('docker machine scenario start ', docker);

                 docker = new Docker({ host: host , port: 2376, 
                            ca: fs.readFileSync('/Users/yrenaudin/.docker/machine/machines/swarm-manager/ca.pem'),
                            cert: fs.readFileSync('/Users/yrenaudin/.docker/machine/machines/swarm-manager/cert.pem'),
                            key: fs.readFileSync('/Users/yrenaudin/.docker/machine/machines/swarm-manager/key.pem')});
                            console.log('docker machine scenario end ', docker);
            }
        }
    }

    function getListNodes(){
        return docker.listNodes();  
    }

    function getListServices(){
        return docker.listServices();
    }

    function getServiceTasks(service){
        return docker.listTasks();
    }

    init();
    return service;
}

module.exports = DockerService;

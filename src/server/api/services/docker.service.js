'use strict';

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
                 docker = new Docker({ host: host});
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

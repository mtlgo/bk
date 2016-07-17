# SwarmUI

## Monitor the host engine
```bash
$ npm install
$ npm start
```

## Monitor a remote host
```bash
$ npm install
$ npm run remote --docker-host=[host-ip]
```

## Docker Image & Container
```bash
# Build swarm-ui image
$ docker build -t swarm-ui .

# Run a swarm-ui container
$ docker run -it -v /var/run/docker.sock:/var/run/docker.sock -p 8080:3000 swarm-ui
```
 
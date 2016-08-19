# SwarmUI
Swarm-ui allows you to vizualize your swarm cluster in seconds ! Just spin the container on your Swarm host manager and you're good to go !

## Run Swarm-UI container 
```bash
docker run -d -v /var/run/docker.sock:/var/run/docker.sock -p 8080:3000 mtlgo/swarmui
```
There are currently 2 tags for our containers:
  * `mtlgo/swarmui` sticks on the master branch
  * `mtlgo/swarmui:debug` sticks on the dev branch and enable Node debugging

## Run local Swarm-UI and monitor your host engine
```bash
npm install
npm start
```

## Monitor a remote host (*Docker For Windows)
```bash
npm install
npm run remote --docker-host=[host-ip]
```

## Development
### Debug Docker container
```bash
# Build swarm-ui debug image
docker pull mtlgo/swarmui:debug

# Run a swarm-ui container in debug mode
docker run -d -v /var/run/docker.sock:/var/run/docker.sock -p 8080:3000 -p 5858:5858 mtlgo/swarmui:debug
```


### Vizualize Swarm-ui Api
Swarm-UI Api is built using swagger. You can access the documentation browsing  /docs url when the app is running.

### Edit Swagger Api

```bash
# Install swagger via npm
npm install -g swagger

# Edit the api
npm run api:edit
```
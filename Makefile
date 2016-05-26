setup: package.json
	sudo apt-get update
	sudo apt-get install nodejs npm node-semver -y
	sudo npm install

run:
	node --harmony server.js || nodejs --harmony server.js

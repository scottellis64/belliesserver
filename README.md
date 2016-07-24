webapp-seed
===============

Starter project template with node.js + mongodb + jspm + angular2 + bootstrap.


Requirements
------------

- Node.Js (>= 5.4.1)
- MongoDb (>= 2.6)

For develop:

- Jspm

Installation on develop
------------

    npm install
    jspm install
    npm run start

To run mongodb in background and then start node use:

    npm run mongod &
    npm run start

Then you can use `jobs` and `fg` to see and switch to previous background processes.

Installation on production
------------

    npm install
    NODE_ENV=production npm run start


Build file for production
------------

    npm run build

Rebuild libraries (bootstrap)
------------

    npm run build

Run unit tests
------------

    npm run test


Deployment
----------

    npm install --production

For openshift I have a node.js cartridge and a custom script to use a custom node.js version (see `.openshift` folder).
Remember to set the `NODE_ENV` environment variable to `production`.
Based on [this solution](https://github.com/ramr/nodejs-custom-version-openshift).

For Azure just deploy the repository using [git deployment](https://azure.microsoft.com/en-us/documentation/articles/web-sites-publish-source-control/).


Stack
-----

- Server
  - Web Server: node.js 5.4.1 with express
  - Ecmascript 6
  - Database: mongodb
- Client
  - Web App
    - Css: bootstrap + sass (compiled with Jspm)
    - Js: angular2 with Ecmascript 6 (compiled with Jspm and Babel)
    - Views: Vash engine
- Test: mocha
- Tools
  - Build: npm
- Deploy
  - Openshift/Azure

Credits
-------

- https://github.com/sahat/hackathon-starter for the node js starter configuration
- http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/ for some npm suggestions


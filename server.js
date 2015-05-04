/**
 * server.js
 * Holds all endpoints for API
 */

'use strict';

// required modules
var restify = require('restify'),
    config = require('./config.json'),

    // files for each of the api routes
    prototype = require('./src/prototype.js'),

    // server
    server = restify.createServer();

// prepare server
server.use(restify.bodyParser());
//server.use(restify.authorizationParser());
server.use(restify.queryParser());

// start server
server.listen(config.api.port, function () {
  console.log('Training Log API running on port ' + config.api.port);

  server.get(/^\/prototype\/?$/, prototype.prototype);

  // Shutdown
  server.get(/^\/exit$/, process.exit);

  // Root
  server.get(/^\/$/, function (req, res) {
    res.setHeader('content-type', 'application/json');
    res.write('Welcome To The Training Log!\n');
    res.end();
  });
});

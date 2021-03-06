// DEPENDENCIES
// ============

var Config =  global.Config = require('./server/config/config.js').config;
    express = require("express"),
    http =    require("http"),
    port =    ( process.env.PORT || Config.listenPort ),
    server =  module.exports = express(),
    mongoose =     require('mongoose'),
    API =     require('./server/API');
    weather = require('./server/weather');
    fuelRest = require('./server/fuelRest');

// DATABASE CONFIGURATION
// ======================

// Connect to Database
/*
mongoose.connect('mongodb://' + Config.database.IP + ':' +Config.database.port + '/' + Config.database.name);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function callback () {
  console.log('Connected to ' + Config.database.name);
});
*/

// DATABASE SCHEMAS
// ================

//var schema = require('./server/schemas/schema');

// SERVER CONFIGURATION
// ====================

server.configure(function() {

  server.use(express["static"](__dirname + "/public"));

  server.use(express.errorHandler({

    dumpExceptions: true,

    showStack: true

  }));

  server.use(express.bodyParser());

  server.use(express.cookieParser());

  server.use(express.session({ secret: Config.sessionSecret }));

  server.use(server.router);

});

//   weather.getCurrent();

// API
// ===

API.api(server);

fuelRest.getTokenContext();


// Start Node.js Server
http.createServer(server).listen(port);

console.log('\n\nWelcome to Stacked!\n\nPlease go to http://localhost:' + port + ' to start using Require.js and Backbone.js\n\n');

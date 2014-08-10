// Express
var express = require('express');
var app = express();

// Port
var serverPort = 30000;

// Current Directory
var currentDir = __dirname;

app.configure(function() {
	app.use(express.static(__dirname+'/ui'));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	// default route
	app.use(function(req, res) {
      res.sendfile(__dirname + '/ui/index.html');
    });
});

// Server Side Route configurations
// Routes
var routes = require('./node/routes/Routes.js')(app,currentDir);

// Start application
app.listen(serverPort);
console.log("Max Muller Portal listening on Port " + serverPort);

exports = module.exports = app;
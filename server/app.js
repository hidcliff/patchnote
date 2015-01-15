'use strict';

/**
 * Dependencies
 */
var express = require('express'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
	errorHandler = require('errorhandler'),
	compression = require('compression'),
	morgan = require('morgan'),
	http = require('http'),
	path = require('path');

var app = express();

/**
 * Configuration
 */
var config = require('./config');
var env = app.get('env');

// all environments
app.set('views',path.join(config.root, '/server/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

console.log(config);

app.use(express.static(path.join(config.root, 'public')));
app.use(morgan('dev'));
app.set('appPath', path.join(config.root, 'public'));

// development only
if (env === 'development') {
	app.use(errorHandler());
}

// production only
if (env === 'production') {
	// TODO
}


/**
 * Routes
 */

require('./routes')(app);


/**
 * Start Server
 */

var server = http.createServer(app);
var port = config.port;

/**
 * Event listener for HTTP server "error" event.
 */

server.on('error', function(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error('Port ' + port + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error('Port ' + port + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
});

server.listen(port, function() {
	console.log('Express server listening on port ' + port);
});
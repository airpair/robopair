var express = require('express');
var routes = require('./routes');
var api = require('./routes/api');
var http = require('http');
var path = require('path');

function frontEndApp() {
	var app = express();

	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	app.get('/', routes.index);

	return app;
}

function apiApp() {
	var app = express();
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());

	app.post('/launch', api.launch);
	app.post('/login/google', api.loginToGoogle);
	app.post('/hangout', api.startAHangout);

	return app;
}

var app = express();
app.set('port', process.env.PORT || 3000);

// all environments
app.use('/robopair', frontEndApp());
app.use('/robopair/api', apiApp());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var apiApp = require('./backend/app');

function frontEndApp() {
	var app = express();
	
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));	
	
	app.get('/', routes.index)
	app.get('/a', routes.advanced);

	return app;
}

var app = express();
app.set('port', process.env.PORT || 3000);

// all environments
app.use('/robopair/api', apiApp());
app.use('/robopair', frontEndApp());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

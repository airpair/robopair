var express = require('express');
var api = require('./api');

module.exports = function() {
	var app = express();
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());

	app.post('/launch', api.launch);
	app.post('/login/google', api.loginToGoogle);
	app.post('/takeover', api.takeoverAHangout);
	app.post('/hangout', api.startAHangout);
	app.post('/start-recording', api.startRecording);
	app.post('/stop-recording', api.stopRecording);
	app.post('/close', api.closeBrowser);
	app.get('/get-url', api.getCurrentUrl);

	return app;
}
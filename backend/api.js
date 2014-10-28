var webdriverio = require('webdriverio');
var Robopair = require('./robopair');
var robopair = new Robopair(webdriverio, 'chrome');


exports.status = function(req, res) {
	res.status(200).end(robopair.status())
}

exports.launch = function(req, res){
	robopair.launch(function() { 
		res.send(201);
	 });
};

exports.loginToGoogle = function(req, res) {
	robopair.loginToGoogle(function() { 
		res.send(200);
	});
};

exports.takeoverAHangout = function(req, res) {
	robopair.takeoverAHangout(req.body.url, function() {
		res.send(200);
	});
};

exports.startAHangout = function(req, res) {
	var data = req.body;
	robopair.startAHangout(data.name, data.invites, function() {
		res.send(200);
	});
};

exports.startRecording = function(req, res) {
	robopair.startRecording(function(){
		res.send(200);
	});
};

exports.stopRecording = function(req, res) {
	robopair.stopRecording(function() {
		res.send(200);
	});
};

exports.closeBrowser = function(req, res) {
	robopair.close( function() {
		res.send(200);
	});
};

exports.getCurrentUrl = function(req,res) {
	robopair.getCurrentUrl(function(err, the_url) {
		if (err)
			res.send(409)
		else
			res.send(200, {url: the_url});
	});
};

exports.getRecordingUrl = function(req, res) {
	robopair.getRecordingUrl(function(err, the_url) {
		if (err)
			res.send(409)
		else
			res.send(200, {recordingUrl: the_url});
	});
};



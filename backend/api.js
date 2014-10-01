var webdriverio = require('webdriverio');
var Robopair = require('./robopair');

var robopair = new Robopair(webdriverio, 'chrome');

exports.launch = function(req, res){
	robopair.launch().pause(100, function() { 
		res.send(201);
	 });
};

exports.loginToGoogle = function(req, res) {
	robopair.loginToGoogle().pause(100, function() { 
		res.send(200);
	});
};

exports.startAHangout = function(req, res) {
	var data = req.body;
	robopair.startAHangout(data.name, data.invites).pause(100, function() {
		res.send(200);
	});
};

exports.startRecording = function(req, res) {
	robopair.record().pause(100, function(){
		res.send(200);
	});
};

exports.closeBrowser = function(req, res) {
	robopair.close().pause(100, function() {
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


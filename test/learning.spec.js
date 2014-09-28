var expect = require('chai').expect;
var webdriverio = require('webdriverio');
var test_options =  { desiredCapabilities: { browserName: 'chrome' } };

function Robopair(the_webdriver, the_browser){
	var webdriver = the_webdriver;
	var browser = the_browser;
	var client = null;

	this.launch = function(the_url) {
		client = webdriver
			.remote({ desiredCapabilities: { browserName: the_browser } })
			.init()
			.url(the_url);
		return client;
	};

	this.close = function() {
		client.end();
		client = null;
	};

	this.loginToGoogle = function(username, password, callback) {
		callback(false);
		return client;
	};
};

describe("Hangout Automation", function(){
	this.timeout(60000); // disable timeouts in this suite
	var robopair;
	var client;

	describe("In Browser Workflow", function(){
		before(function(){
			 robopair = new Robopair(webdriverio, 'firefox');
		});

		after(function(){
			// robopair.close();
		});

		it("login to google with team@", function(done) {
			client = robopair.launch("https://accounts.google.com");
			client.setValue("input#Email", "team@airpair.com")
				.setValue("input#Passwd", "jg5ThvRF")
				.click("input#signIn")
				.waitFor('a#nav-personalinfo', 5000, 
					function(err, res, command) { 
						if (err) {
							client.click("input#MapChallenge.radio")
								.setValue("div#MapChallengeOptionContent input#address", "San Francisco")
								.click("input#submitChallenge")
								.waitFor('a#nav-personalinfo', 5000, 
									function(err) { 
										console.log("GOOGLE LOGIN FAILURE", err); done();
									});
						}
						else {
							done();
						}
					});
		});

		it("join hangout", function(done) {
			var manual_hangout_url = "https://plus.google.com/hangouts/_?hso=0&gid=140030887085";
			client.url(manual_hangout_url)
				.pause(2000)
				.alertAccept()
				.waitFor('div.xb-Mc-gh-fi input', 60000)
				.setValue('div.xb-Mc-gh-fi input', "Customer+Expert {technology}", function(){ console.log("in callback");done(); });
		});

		it("stop recording");
		it("recover recording link");
		it("recover hangout link");
		it("close browser");
		it("get status");
	});
});
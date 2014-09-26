var expect = require('chai').expect;
var webdriverio = require('webdriverio');
var test_options =  { desiredCapabilities: { browserName: 'firefox' } };

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
			robopair.close();
		});

		it("login to google with team@", function(done) {
			
			client = robopair.launch("https://accounts.google.com");
			client.setValue("input#Email", "team@airpair.com")
				.setValue("input#Passwd", "jg5ThvRF")
				.click("input#signIn")
				.click("input#MapChallenge.radio")
				.setValue("div#MapChallengeOptionContent input#address", "San Francisco")
				.click("input#submitChallenge");
		});

		it("join hangout via link");
		it("stop recording");
		it("recover recording link");
		it("recover hangout link");
		it("close browser");
		it("get status");
	});
});
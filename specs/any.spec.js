var expect = require('chai').expect;
var webdriverio = require('webdriverio');


function Robopair(the_webdriver, the_browser){
	var webdriver = the_webdriver;
	var browser = the_browser;

	this.launch = function(the_url) {
		return webdriver
			.remote({ desiredCapabilities: { browserName: the_browser } })
			.init()
			.url(the_url);
	};
};

describe("Hangout Automation", function(){
	this.timeout(60000); // disable timeouts in this suite
	var robopair = new Robopair(webdriverio, 'firefox');
	var client;

	describe("Browser Mechanics", function(){
		afterEach(function() {
			client.end();
		});

		it("launch browser", function(done){
			client = robopair.launch('http://www.google.com');
			client.title(function(err, res){
				expect(res.value).to.equal("Google");
				done();
			});
		});
	});

	describe("In Browser Workflow", function(){
		beforeEach(function(){
			client = webdriverio.remote(options).init();
		});

		afterEach(function(){
			client.end();
		});

		it("login to google with team@");
		it("join hangout via link");
		it("stop recording");
		it("recover recording link");
		it("recover hangout link");
		it("close browser");
		it("get status");
	});


});
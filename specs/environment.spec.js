var expect = require('chai').expect;
var webdriverio = require('webdriverio');

describe("Local Environment", function(){
	this.timeout(60000); // disable timeouts in this suite
	var the_browser = 'firefox';
	var options = { desiredCapabilities: { browserName: the_browser } };

	it("webdriver is available", function(){
		expect(webdriverio).to.exist;
	});

	it("javadk is available");

	it("can launch " + the_browser + " and reach accounts.google.com" , function(done) {
		var page_title = "";

		webdriverio
			.remote(options).init()
			.url('https://accounts.google.com')
			.title(function(err, res) {
        		page_title = res.value;
        		expect(res.value).to.equal("Sign in - Google Accounts");
        		done();
	    	})
	    	.end();
	});
});
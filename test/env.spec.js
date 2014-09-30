var expect = require('chai').expect;
var webdriverio = require('webdriverio');

describe("Local Environment", function(){
	this.timeout(60000); // disable timeouts in this suite
	var the_browser = 'chrome';
	var options = { desiredCapabilities: { browserName: the_browser } };

	it("javadk is available");
	it("webdriver is available", function(){
		expect(webdriverio).to.exist;
	});
	it("can launch " + the_browser + " and reach www.google.com" , function(done) {
		var page_title = "";

		webdriverio
			.remote(options).init()
			.url('https://www.google.com')
			.title(function(err, res) {
        		page_title = res.value;
        		expect(res.value).to.equal("Google");
        		done();
	    	})
	    	.end();
	});
});
var expect = require('chai').expect;
var webdriverio = require('webdriverio');
var test_options =  { desiredCapabilities: { browserName: 'chrome' } };

function Robopair(the_webdriver, the_browser){
	var webdriver = the_webdriver;
	var browser = the_browser;
	var client = null;

	this.launch = function() {
		client = webdriver
			.remote({ desiredCapabilities: { browserName: the_browser } })
			.init();
		return client;
	};

	this.close = function() {
		client.end();
		client = null;
	};

	this.loginToGoogle = function() {
		client.url("https://accounts.google.com")
			.waitFor("input#Email", 5000)
			.setValue("input#Email", "team@airpair.com")
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
									console.log("GOOGLE LOGIN FAILURE", err);
								});
					}
				});

		return client;
	};

	this.joinHangout = function(the_url) {
		client.url(the_url)
			.waitFor('div.xb-Mc-gh-fi input', 60000)
			.setValue('div.xb-Mc-gh-fi input', "Customer+Expert {technology}")
			.setValue('input.n-Ol-Qa', "stevejpurves@gmail.com")
			.pause(1000)
			.click('div.xb-Mc-ie-Gc div.c-N-K', 
				function(){ console.log("in callback"); });
		return client;
	};
};

describe("Hangout Automation", function(){
	this.timeout(60000); // disable timeouts in this suite
	var robopair;
	var client;

	describe("In Browser Workflow", function(){
		before(function(){
			 robopair = new Robopair(webdriverio, 'chrome');
		});

		after(function(){
			// robopair.close();
		});

		it ("launch a browser", function(done) {
			client = robopair.launch().pause(1000, function() { done(); });
		});


		it("login to google with team@", function(done) {
			client = robopair.loginToGoogle().pause(100, function() { done(); });
		});

		it("join hangout", function(done) {
			var manual_hangout_url = "https://plus.google.com/hangouts/_?hso=0&gid=140030887085";
			client = robopair.joinHangout(manual_hangout_url).pause(100, function() { done(); });
		});

		// it("start recording", function(done){
		// 	client.pause(60000) 
		// 		.click('.tb-b-m div[role="button"]')
		// 		.waitFor('#\3a 108\2e si', 1000)
		// 		.click('#\3a 108\2e si', function(){ done(); });
		// });

		// it("stop recording", function(done) {
		// 	client.pause(10000)
		// 		.click();
		// });

		// it("recover recording link", function () {
		// 	var selector_links_link = '#\3a u0\2e Yh'; // 'div.r-b'
		// 	var selector_recording_link = '#\3a u0\2e ai'; //r-l-Ga nZCpyb

		// 	client.pause()
		// }); 

		it("recover hangout link");
		it("end call") // .ha-w-me-f
		it("close browser");
		it("is recording?"); // #\:tx\.Vh
		it("get status");
	});
});


// Mute button CSS #\3a sq\2e \24 q > div > div.c-N-K.a-b.a-b-G.Ha-ha-Sb-b.IQ > div
// Mute button XPATH //*[@id=":sq.$q"]/div/div[2]/div
var expect = require('chai').expect;
var webdriverio = require('webdriverio');
var test_options =  { desiredCapabilities: { browserName: 'chrome' } };
var Robopair = require('../robopair');

console.log(Robopair);

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
			client = robopair.loginToGoogle()
				.pause(100, function() { done(); });
		});

		it("start a hangout", function(done) {
			var manual_hangout_url = "https://plus.google.com/hangouts/_?hso=0&gid=140030887085";
			client = robopair.startAHangout(manual_hangout_url, 
				"Customer+Expert {technology}", "stevejpurves@gmail.com")
				.pause(100, function() { done(); });
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
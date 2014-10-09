var expect = require('chai').expect;
var webdriverio = require('webdriverio');
var test_options =  { desiredCapabilities: { browserName: 'chrome' } };
var Robopair = require('../backend/robopair');

describe("Robopair API", function(){
	this.timeout(100000); // disable timeouts in this suite
	var robopair;
	var client;

	describe("In Browser Workflow", function() {
		var any_hangout_name = "Customer+Expert {technology}";

		before(function () {
			robopair = new Robopair(webdriverio, 'chrome');
		});

		after(function (done) {
			robopair.close()
			done();
		});

		it("status should show no acivity", function() {
			var the_status = robopair.status();
			expect(the_status.launched).to.be.false
			expect(the_status.loggedin).to.be.false
			expect(the_status.hangout_running).to.be.false
		});

		it("launch a browser", function(done) {			
			robopair.launch(function(response) { 
				expect(response).to.be.true;
				expect(robopair.status().launched).to.be.true;
				done();
			});
		});

		it("login to google with team@", function(done) {
			robopair.loginToGoogle(function(response) {
				expect(response).to.be.true;
				expect(robopair.status().loggedin).to.be.true
				done();
			});
		});

		it("start a hangout with two emails", function(done) {
			robopair.startAHangout(any_hangout_name, ["a@b.com", "b@d.com"], 
				function(response) { 
					expect(response).to.be.true;
					expect(robopair.status().hangout_running).to.be.true
					done();
				});
		});

		// it("start recording", function(done) {
		// 	robopair.startRecording(done);
		// });

		// it("get recording link", function(done){
		// 	robopair.getRecordingLink(done);
		// });

		// it("stop recording", function(done) {
		// 	robopair.stopRecording(done);				
		// });

		// it("recover hangout link", function(done) {
		// 	robopair.getCurrentUrl(function(the_url) {
		// 		expect(the_url).to.not.be.empty;
		// 		expect(the_url).to.match(/http/);
		// 		done();
		// 	});
		// });
	});
});


// Mute button CSS #\3a sq\2e \24 q > div > div.c-N-K.a-b.a-b-G.Ha-ha-Sb-b.IQ > div
// Mute button XPATH //*[@id=":sq.$q"]/div/div[2]/div
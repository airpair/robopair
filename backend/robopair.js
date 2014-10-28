var domain = require('domain');
var d = domain.create();

module.exports = (function() {

	var strings = {
		google_login_url: "https://accounts.google.com",
		team_email: "team@airpair.com",
		team_pass: "jg5ThvRF",
		challenge_location: "San Francisco"
	};

	var selectors = {
		google_login_email: "input#Email",
		google_login_password: "input#Passwd",
		google_login_signin: "input#signIn",
		google_home_personal_info_tab: 'a#nav-personalinfo',
		google_challenge_choose_location: "input#MapChallenge.radio",
		google_challenge_location: "div#MapChallengeOptionContent input#address",
		google_challenge_submit: "input#submitChallenge",
		hangout_name: "div.xb-Mc-gh-fi input",
		hangout_invite_list: "input.n-Ol-Qa",
		hangout_start_button: "div.xb-Mc-ie-Gc div.c-N-K",
		recording_start_button: '.tb-b-m div[role="button"]',
		recording_confirm_ok: '.qa-l-ra div[role="button"]',
		join_hangout_conditions_checkbox: 'div[role="presentation"].a-X-fe',
		join_hangout_okay_go_for_it_button: '//*[@id=":t4.Dh"]',
		join_hangout_join_button: '//*[@id=":t9.Sq"]',
		stop_recording_button: '.tb-b-m div[role="button"]', //*[@id=":wc.ai"]',
		recording_link_button: '.tb-P-Ua-pa-m div[role="button"]', //tb-P-pa-m-J
		recording_link_field: '.r-za input[type="text"]',
		invite_outside_dialog: '.n-ob-s-b',
		invite_outside_button: '.n-ob-s-b div[role="button"]:first-child'
	};

	var webdriver;
	var browser;
	var client = null;
	var pause_length = 3000;
	var wait_length = 10000;
	var massive_wait = 60000;

	var status = {
		browser_launched: false,
		logged_in_to_google: false,
		hangout_running: false,
		is_recording: false
	};

	function Robopair(the_webdriver, the_browser) {
		var webdriver = the_webdriver;
		var browser = the_browser;

		this.status = function () {
			return status;
		};

		this.launch = function(cb) {
			client = webdriver
				.remote({ desiredCapabilities: { browserName: the_browser } })
				.init()
				.pause(pause_length, function() { 
					status.browser_launched = true;
					cb(client !== null);
				});
			return this;
		};

		this.close = function(cb) {
			if (client)	client.end(cb);
			else cb(null);
			return this;
		};

		this.loginToGoogle = function(cb) {
			if (client)
				client.url(strings.google_login_url)
					.waitFor(selectors.google_login_email, wait_length)
					.setValue(selectors.google_login_email, strings.team_email)
					.setValue(selectors.google_login_password, strings.team_pass)
					.click(selectors.google_login_signin)
					.waitFor(selectors.google_home_personal_info_tab, wait_length, 
						function(err, res, command) { 
							if (err) {
								client.click(selectors.google_challenge_choose_location)
									.setValue(selectors.google_challenge_location, strings.challenge_location )
									.click(selectors.google_challenge_submit)
									.waitFor(selectors.google_home_personal_info_tab, wait_length, 
										function(err) { 
											console.log("GOOGLE LOGIN FAILURE", err);
											cb(false);
										});
							}
							else
							{
								status.logged_in_to_google = true;
								cb(true);
							}
						});			
			return this;
		};

		this.takeoverAHangout = function(the_url, cb) {
			return client.url(the_url)
						.waitFor(selectors.join_hangout_conditions_checkbox, wait_length)
						.pause(pause_length)
						.click(selectors.join_hangout_conditions_checkbox)
						.waitFor(selectors.join_hangout_okay_go_for_it_button,wait_length)
						.pause(pause_length)
						.click(selectors.join_hangout_okay_go_for_it_button)
						.waitFor(selectors.join_hangout_join_button,wait_length)
						.pause(pause_length)
						.click(selectors.join_hangout_join_button);
		};

		this.startAHangout = function(the_name, invites, cb) {
			if (!client) { 
				cb(false); 
				return;
			}

			var the_url = "https://plus.google.com/hangouts/_?hso=0&gid=140030887085";
			client.url(the_url)
				.waitFor(selectors.hangout_name, wait_length)
				.setValue(selectors.hangout_name, the_name)
				.pause(pause_length);

			if (invites.length)
			{
				client.setValue(selectors.hangout_invite_list, invites[0] + '\n')
					.waitFor(selectors.invite_outside_dialog, wait_length)
					.click(selectors.invite_outside_button)
					.pause(pause_length);
				for (var i = 1; i < invites.length; i++) {
					client.setValue(selectors.hangout_invite_list, invites[i] + '\n')
						.pause(pause_length);
				}
			}
						
			client.waitFor(selectors.hangout_start_button, wait_length)
				.pause(pause_length)
				.click(selectors.hangout_start_button)
				.pause(pause_length)
				.waitForVisible(selectors.recording_start_button, massive_wait, true)
				.pause(pause_length, function() {
					status.hangout_running = true;
					cb(true);
				});
		};

		this.startRecording = function(cb) {
			if (client) {
				client
					.waitFor(selectors.recording_start_button, massive_wait)
					.click(selectors.recording_start_button)
					.waitFor(selectors.recording_confirm_ok, wait_length)
					.click(selectors.recording_confirm_ok, function() {
						cb();
					});
			}
			return this;
		};

		this.stopRecording = function(cb) {
			if (client) {		
				client.waitFor(selectors.stop_recording_button, wait_length)
					.click(selectors.stop_recording_button, function() {cb();});
			}
			return this;
		};	

		this.getCurrentUrl = function(callback) {
			if (client) {
				client.url(function(err, response) {		
					callback(err, response.value);
				});
			}
			return this;
		};

		this.getRecordingUrl = function(callback) {
			if (client) {
				client.click(selectors.recording_link_button)
					.pause(pause_length).waitFor(selectors.recording_link_field, wait_length)
					.getValue(selectors.recording_link_field, function(err, value) { callback(err, value[1]) });				
			}
			return this;
		};
	};

	return Robopair;
})();
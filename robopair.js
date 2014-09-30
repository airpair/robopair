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
		hangout_start_button: "div.xb-Mc-ie-Gc div.c-N-K"
	};

	var webdriver;
	var browser;
	var client = null;

	function Robopair(the_webdriver, the_browser) {
		var webdriver = the_webdriver;
		var browser = the_browser;

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
			client.url(strings.google_login_url)
				.waitFor(selectors.google_login_email, 5000)
				.setValue(selectors.google_login_email, strings.team_email)
				.setValue(selectors.google_login_password, strings.team_pass)
				.click(selectors.google_login_signin)
				.waitFor(selectors.google_home_personal_info_tab, 5000, 
					function(err, res, command) { 
						if (err) {
							client.click(selectors.google_challenge_choose_location)
								.setValue(selectors.google_challenge_location, strings.challenge_location )
								.click(selectors.google_challenge_submit)
								.waitFor(selectors.google_home_personal_info_tab, 5000, 
									function(err) { 
										console.log("GOOGLE LOGIN FAILURE", err);
									});
						}
					});

			return client;
		};

		this.startAHangout = function(the_name, invites) {
			var the_url = "https://plus.google.com/hangouts/_?hso=0&gid=140030887085";
			client.url(the_url).waitFor(selectors.hangout_name, 60000);
			if (the_name)
				client.setValue(selectors.hangout_name, the_name);
			if (invites)
				client.setValue(selectors.hangout_invite_list, invites);
			return client.pause(1000).click(selectors.hangout_start_button);
		};
	};

	return Robopair;
})();
var WebDriverManager = require('webdriver-manager')

var wm = new WebDriverManager('./selenium');

console.log(wm.status());

wm.install(['standalone', 'chrome'], function(err, filenames) {
	console.log(filenames);
	console.log(wm.status());
	wm.start({timeout:60000});
});
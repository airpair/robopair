var robopair = angular.module('Robopair', []);

robopair.controller("MainController", ["$scope", "$http", function($scope, $http){
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.getCurrentUrl = "";
	$scope.lastStatus = "";
	$scope.takeoverThisUrl = "";
	$scope.recordingUrl = "";

	function logStuff(promise) {
		function logLastStatus(response) {
			$scope.lastStatus = response.status + " | " + response.data;
			setTimeout(function(){ $scope.lastStatus = ""; }, 4000);
		}
		return promise.then(logLastStatus);
	}

	$scope.launch = function() {
		$http.post('/robopair/api/launch');
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.loginToGoogle = function() {
		$http.post('/robopair/api/login/google')
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.takeover = function() {
		$http.post('/robopair/api/takeover', {url: $scope.takeoverThisUrl})
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.startAHangout = function() {
		$http.post('/robopair/api/hangout',
			{name: $scope.hangoutName, invites: $scope.invites})
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.startRecording = function() {
		$http.post('/robopair/api/start-recording')
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.stopRecording = function() {
		$http.post('/robopair/api/stop-recording')
		logStuff($http.get('/robopair/api/status'))
	}

	$scope.closeBrowser = function() {
		$http.post('/robopair/api/close')
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.getCurrentUrl = function() {
		$http.get('/robopair/api/get-url').success(function(data) {
			$scope.currentUrl = data.url;
		})
		logStuff($http.get('/robopair/api/status'))
	};

	$scope.getRecordingUrl = function() {
		$http.get('/robopair/api/get-recording-url').success(function(data) {
			$scope.recordingUrl = data.recordingUrl;
		})
		logStuff($http.get('/robopair/api/status'))
	};
}]);

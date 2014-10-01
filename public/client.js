var robopair = angular.module('Robopair', []);

robopair.controller("MainController", ["$scope", "$http", function($scope, $http){
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.getCurrentUrl = "";
	$scope.lastStatus = "";
	$scope.takeoverThisUrl = "";

	function logStuff(promise) {
		function logLastStatus(response) {
			$scope.lastStatus = response.status + " | " + response.data;
		}
		return promise.then(logLastStatus);
	}

	$scope.launch = function() {
		logStuff( $http.post('/robopair/api/launch') );
	};

	$scope.loginToGoogle = function() {
		logStuff( $http.post('/robopair/api/login/google') );
	};

	$scope.takeover = function() {
		logStuff( $http.post('/robopair/api/takeover', {url: $scope.takeoverThisUrl}) );
	};

	$scope.startAHangout = function() {
		logStuff($http.post('/robopair/api/hangout',
			{name: $scope.hangoutName, invites: $scope.invites}));
	};

	$scope.startRecording = function() {
		logStuff($http.post('/robopair/api/start-recording'));
	};

	$scope.stopRecording = function() {
		logStuff($http.post('/robopair/api/stop-recording'));
	}

	$scope.closeBrowser = function() {
		logStuff($http.post('/robopair/api/close'));
	};

	$scope.getCurrentUrl = function() {
		logStuff($http.get('/robopair/api/get-url').success(function(data) {
			$scope.currentUrl = data.url;
		}));
	};
}]);

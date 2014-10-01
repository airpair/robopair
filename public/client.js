var robopair = angular.module('Robopair', []);

robopair.controller("MainController", ["$scope", "$http", function($scope, $http){
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.getCurrentUrl = "";
	$scope.lastStatus = "";

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

	$scope.startAHangout = function() {
		logStuff($http.post('/robopair/api/hangout',
			{name: $scope.hangoutName, invites: $scope.invites}));
	};

	$scope.startRecording = function() {
		logStuff($http.post('/robopair/api/start-recording'));
	};

	$scope.closeBrowser = function() {
		logStuff($http.post('/robopair/api/close'));
	};

	$scope.getCurrentUrl = function() {
		logStuff($http.get('/robopair/api/get-url').success(function(data) {
			$scope.currentUrl = data.url;
		}));
	};
}]);

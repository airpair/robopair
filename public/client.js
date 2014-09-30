var robopair = angular.module('Robopair', []);

robopair.controller("MainController", ["$scope", "$http", function($scope, $http){
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.lastStatus = "";

	function logStuff(promise) {
		function logLastStatus(data, status) {
			$scope.lastStatus = status + " | " + data;
		}
		promise.success(logLastStatus).error(logLastStatus);
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
		logStuff($http.post('/robopair/api/record'));
	};

}]);

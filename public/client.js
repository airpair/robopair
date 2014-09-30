var robopair = angular.module('Robopair', []);

robopair.controller("MainController", ["$scope", "$http", function($scope, $http){
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.lastStatus = "";

	function logLastStatus(data, status)
	{
		$scope.lastStatus = status + " | " + data;
	}

	$scope.launch = function() {
		$http.post('/robopair/api/launch')
			.success(logLastStatus)
			.error(logLastStatus);
	};

	$scope.loginToGoogle = function() {
		$http.post('/robopair/api/login/google')
			.success(logLastStatus)
			.error(logLastStatus);
	};

	$scope.startAHangout = function() {
		$http.post('/robopair/api/hangout',
			{name: $scope.hangoutName, invites: $scope.invites})
			.success(logLastStatus)
			.error(logLastStatus);
	};

}]);

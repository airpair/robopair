var robopair = angular.module('Robopair', []);



robopair.controller("MainController", ["$scope", "$http", function($scope, $http){
	$scope.status = {
		browser_launched: false,
		logged_in_to_google: false,
		hangout_running: false,
		is_recording: false
	};
	$scope.currentUrl = '';
	$scope.tab = 1;
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.joinThisUrl = "";
	$scope.spinningJson = ""

	$http.get('/robopair/api/status').success(function(the_status){
		$scope.status = the_status;

		if ($scope.status.hangout_running)
			fetchCurrentUrl()

	});

	function updateStatus()
	{
		return $http.get('/robopair/api/status')
			.success(function(data){
				$scope.status = data;
			});
	}

	function fetchCurrentUrl()
	{
		return $http.get('/robopair/api/get-url')
			.success(function(data){
				$scope.currentUrl = data.url;
			});
	}

	function clearCurrentUrl()
	{
		$scope.currentUrl = '';
	}

	function launchAndLogin()
	{
		return $http.post('/robopair/api/launch')
			.success(updateStatus)
			.then(function() {
				$http.post('/robopair/api/login/google')
				.success(updateStatus);
			});
	}

	$scope.startANewHangout = function() {
		launchAndLogin()
			.then(function() {
				return $http.post('/robopair/api/hangout',
					{name: $scope.hangoutName, invites: $scope.invites.split(/[;,]+\s*/)})
					.success(updateStatus)
					.success(fetchCurrentUrl);
			});
	};

	$scope.spinAHangout = function() {
		var spinObject = JSON.parse($scope.spinningJson);
		if (spinObject && spinObject.name && spinObject.invites) {
			launchAndLogin()
				.then(function() {
					return $http.post('/robopair/api/hangout',
						$scope.spinningJson)
						.success(updateStatus)
						.success(fetchCurrentUrl);
				});
		}
		else
		{
			console.log("could not spin", $scope.spinningJson);
		}
	};

	$scope.joinAHangout = function() {
		launchAndLogin()
			.then(function() {
				return $http.post('/robopair/api/takeover', {url: $scope.joinThisUrl})
					.success(updateStatus)
					.success(fetchCurrentUrl);
			});
	}

	$scope.startRecording = function() {
		$http.post('/robopair/api/start-recording')
			.success(updateStatus);
	};

	$scope.stopRecording = function() {
		$http.post('/robopair/api/stop-recording')
			.success(updateStatus);		
	}

	$scope.closeBrowser = function() {
		$http.post('/robopair/api/close')
			.success(updateStatus)
			.success(clearCurrentUrl);
	};

}]);



robopair.controller("AdvancedController", ["$scope", "$http", function($scope, $http){
	$scope.hangoutName = "Customer+Expert {technology}";
	$scope.invites = "stevejpurves@gmail.com";
	$scope.getCurrentUrl = "";
	$scope.lastStatus = "";
	$scope.takeoverThisUrl = "";
	$scope.recordingUrl = "";

	function logStatus(promise) {
		function logLastStatus(response) {
			$scope.lastStatus = response.status + " | " + JSON.stringify(response.data);
		}
		return promise.then(logLastStatus);
	}

	$scope.launch = function() {
		$http.post('/robopair/api/launch').then(function() {
			logStatus($http.get('/robopair/api/status'))			
		});
	};

	$scope.loginToGoogle = function() {
		$http.post('/robopair/api/login/google').then(function() {
			logStatus($http.get('/robopair/api/status'));	
		})

	};

	$scope.takeover = function() {
		$http.post('/robopair/api/takeover', {url: $scope.takeoverThisUrl})
			.then(function(){ 
				logStatus($http.get('/robopair/api/status'))
			});
	};

	$scope.startAHangout = function() {
		$http.post('/robopair/api/hangout',
			{name: $scope.hangoutName, invites: $scope.invites.split(/[;,]+\s*/)})
			.then(function() {
				logStatus($http.get('/robopair/api/status'));		
			});
	};

	$scope.startRecording = function() {
		$http.post('/robopair/api/start-recording')
			.then(function(){
				logStatus($http.get('/robopair/api/status'))		
			});
	};

	$scope.stopRecording = function() {
		$http.post('/robopair/api/stop-recording')
			.then(function(){
				logStatus($http.get('/robopair/api/status'))		
			});		
	}

	$scope.closeBrowser = function() {
		$http.post('/robopair/api/close')
			.then(function(){
				logStatus($http.get('/robopair/api/status'))		
			});
	};

	$scope.getCurrentUrl = function() {
		$http.get('/robopair/api/get-url').success(function(data) {
			$scope.currentUrl = data.url;
			logStatus($http.get('/robopair/api/status'))
		})
	};

	$scope.getRecordingUrl = function() {
		$http.get('/robopair/api/get-recording-url').success(function(data) {
			$scope.recordingUrl = data.recordingUrl;
			logStatus($http.get('/robopair/api/status'))
		})		
	};
}]);

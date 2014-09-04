'use strict';

angular.module('goApp')
.controller('InvitedEventsCtrl', function ($scope, $http) {

	$scope.currentUser = {};
	$scope.events = [];
	

	$http.get('/api/users/me')
	.then(function(result){
		$scope.currentUser = result.data;
		console.log("Current User: ", $scope.currentUser);
	});

	$http.get('/api/events')
	.success(function(data, status, headers, config) {
		$scope.tempEvents = data;
		console.log("Temp Events: ", $scope.tempEvents);
		for(var i = 0; i < $scope.tempEvents.length; i++){
			for(var k = 0; k < $scope.tempEvents[i].invited.length; k++){
				if($scope.tempEvents[i].invited[k].username === $scope.currentUser.username){
					$scope.events.push($scope.tempEvents[i]);
				}
			}

		}
	});


});

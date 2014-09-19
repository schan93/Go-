'use strict';

angular.module('goApp')
.controller('InvitedEventsCtrl', function ($scope, $http) {

	$scope.currentUser = {};
	$scope.events = [];

	var getCurrentUser = $http.get('/api/users/me')
	.success(function(data){
		console.log("Data: ", data);
		$scope.currentUser = data;
		$http.get('/api/users/invited/events/' + $scope.currentUser._id)
		.success(function(data){
			$scope.events = data;
		});
	});
});

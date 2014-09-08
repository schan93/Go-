'use strict';

angular.module('goApp')
.controller('InvitedEventsCtrl', function ($scope, $http) {

	$scope.currentUser = {};
	$scope.events = [];


	$http.get('/api/users/me')
	  .then(function(result){
	    $scope.currentUser = result.data;
	    $http.get('/api/users/invited/events/' + $scope.currentUser._id)
	      .success(function(data){
	      	$scope.events = data;
	      });
	});




});

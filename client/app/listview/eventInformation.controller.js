'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $http, $routeParams, $rootScope, $cookieStore, User, Auth, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();

    //We need to somehow pass in the logged in user's name
    $scope.attending = function(){
   		var currentUser = {};
    	var userAttendingEvent = {};
    	if($cookieStore.get('token')) {
      		currentUser = User.get();
      		console.log("Current User: ", currentUser);
      		console.log("Event: ", $scope.event);
    	}

      for(var i = 0; i < $scope.event.attendees.length; i++){
      	if($scope.event.attendees[i].name === currentUser.name);
      		userAttendingEvent = false;
      }
      if(userAttendingEvent){
      	$scope.event.attendees.push(currentUser);
      	console.log("Pushed!: ", $scope.event);

      	$http.put('/api/events/:id',0).
      		success(function(data){
       			 $location.path('/');
      	});
      }
    };

  });
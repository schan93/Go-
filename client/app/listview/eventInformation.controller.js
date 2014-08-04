'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $location, $http, $routeParams, $rootScope, $cookieStore, User, Auth, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();
  	$scope.userAttendingEvent = true;

    //We need to somehow pass in the logged in user's name
    $scope.attending = function(event){
   		var currentUser = {};
    	var userAttendingEvent = true;
    	if($cookieStore.get('token')){
      		currentUser = User.get();
      		console.log("Current User: ", currentUser);
    	}

     // for(var i = 0; i < $scope.event.attendees.length; i++){
     // 	if($scope.event.attendees[i].name === currentUser.name && $scope.event.attendees.length > 0);
     // 		userAttendingEvent = false;
     // }
      if(userAttendingEvent){
      	$scope.event.attendees.push(currentUser);

      	$http.put('/api/events/' + $scope.event._id, $scope.event).success(function(data){
          for(var i = 0; i < $scope.event.attendees.length; i++){
            console.log("Attendees length: ", $scope.event.attendees.length);
            console.log("Attendees: ", $scope.event.attendees[i].name);
          }

          $location.path('/');
        });
      	
      }
    };

  });
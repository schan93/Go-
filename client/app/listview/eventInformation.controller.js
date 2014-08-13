'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $location, $http, $routeParams, $rootScope, $cookieStore, User, Auth, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();
  	$scope.userAttendingEvent = true;
    $scope.user = Auth.getCurrentUser();
    $scope.test = {};

    $http.get('/api/events/' + $scope.event._id)
      .success(function(data, status, headers, config) {
        $scope.usersAttending = data;
        for(var i = 0; i < $scope.usersAttending.attendees.length; i++){
          console.log("Testing username: ", $scope.usersAttending.attendees[i].username);
        }
    });

    $scope.attending = function(event){

      if($cookieStore.get('token')){
        $scope.currentUser = Auth.getCurrentUser();
      }
      for(var i = 0; i < $scope.events.length; i++){
        if(event.attendees[i] === $scope.currentUser._id){
          alert("This user is already attending this event.");
          return;
        }
      }

      event.attendees.push($scope.currentUser._id);
      $http.put('/api/events/' + event._id, event)
        .success(function(data) {
          console.log("Success. Event " + event._id + " was edited.");
        });
      $scope.currentUser.eventsAttending.push(event._id);
      $http.put('/api/users/' + $scope.currentUser._id, $scope.currentUser)
        .success(function(data){
          console.log("Success. User " + $scope.currentUser.name);
        });
    }

  });
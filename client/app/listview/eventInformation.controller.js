'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $location, $http, $routeParams, $rootScope, $cookieStore, User, Auth, listviewService) {

    $scope.eventId = $routeParams.id;
  	$scope.userAttendingEvent = false;
    $scope.currentUser = {};
    $scope.test = {};


  $http.get('/api/users/me')
    .then(function(result){
      $scope.currentUser = result.data;
  });

    $http.get('/api/events/' + $scope.eventId)
      .success(function(data, status, headers, config) {
        $scope.event = data;
        for(var i = 0; i < $scope.event.attendees.length; i++){
          if($scope.event.attendees[i] === $scope.currentUser.username){
            $scope.userAttendingEvent = true;
          }
        }
    });

    $scope.attending = function(event){
      $http.put('/api/events/' + event._id, $scope.currentUser)
        .success(function(data) {
          console.log("Success. Event " + event._id + " was edited.");
        });
      $http.put('/api/users/' + $scope.currentUser._id, event)
        .success(function(data){
          console.log("Success. User " + $scope.currentUser.name);
        });

    };

  });
 
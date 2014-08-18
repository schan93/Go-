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
    });

    $scope.attending = function(event){
      if($cookieStore.get('token')){
        $scope.currentUser = Auth.getCurrentUser();
      }
      $http.put('/api/events/' + event._id, $scope.currentUser)
        .success(function(data) {
          console.log("Success. Event " + event._id + " was edited.");
        });
      $http.put('/api/users/' + $scope.currentUser._id, event)
        .success(function(data){
          console.log("Success. User " + $scope.currentUser.name);
        });
    }

  });
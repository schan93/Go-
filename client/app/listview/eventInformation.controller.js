'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $location, $http, $routeParams, $rootScope, $cookieStore, User, Auth, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();
  	$scope.userAttendingEvent = true;
    $scope.user = Auth.getCurrentUser();
    $scope.test = {};

    $http.get('/api/events/' + $scope.event.eventName)
      .success(function(data, status, headers, config) {
        $scope.test = data;
        console.log("Scope test:" + $scope.test.eventName);
    });

  });
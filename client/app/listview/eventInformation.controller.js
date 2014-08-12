'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $location, $http, $routeParams, $rootScope, $cookieStore, User, Auth, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();
  	$scope.userAttendingEvent = true;
    $scope.user = Auth.getCurrentUser();
    $scope.test = {};

    $http.get('/api/events/' + $scope.event._id)
      .success(function(data, status, headers, config) {
        $scope.test = data;
        $scope.testing = JSON.parse(JSON.stringify($scope.test, null, 4));
        for(var i = 0; i < $scope.test.attendees.length; i++){
          console.log("Testing username: ", $scope.testing.attendees[i].username);
        }
    });

  });
'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope) {
    $scope.time = {
      'startDate': "",
      'endDate': "",
      'startTime': "",
      'endTime': ""
    };

    $scope.eventLocation = "";
    $scope.eventName = "";
    $scope.test = "";

    $scope.createEvent = function(){
      $http.post('/api/user/createEvent', data).success(function(){
        $location.path("/");
      });
    }
  });

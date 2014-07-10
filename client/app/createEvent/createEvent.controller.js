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

    }
  });

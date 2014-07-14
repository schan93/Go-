'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope, $http, $location) {

    $scope.event = {
      'startDate': "",
      'endDate': "",
      'startTime': "",
      'endTime': "",
      'eventLocation': "",
      'eventName': "",
    };

    $scope.create = function(){
      $http.post('/api/event', $scope.event).
      success(function(data){
        $location.path('/');
      });
    };

  });

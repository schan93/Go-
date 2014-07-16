'use strict';

angular.module('goApp', ['mgcrea.ngStrapDocs'])
  .controller('CreateEventCtrl', function ($scope, $http, $location) {

    $scope.eventObj = {
      'startDate': "",
      'endDate': "",
      'startTime': "",
      'endTime': "",
      'eventLocation': "",
      'eventName': "",
    };

    $scope.create = function(){
      $http.post('/api/events', $scope.eventObj).
      success(function(data){
        $location.path('/');
      });
    };

$scope.popover = {
  "title": "Title",
  "content": "Hello Popover<br />This is a multiline message!"
};

});


'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope, $http, $location) {

    $scope.eventObj = {
      'startDate': "",
      'endDate': "",
      'eventLocation': "",
      'eventName': ""
    };

    $scope.create = function(){
      $http.post('/api/events', $scope.eventObj).
      success(function(data){
        $location.path('/');
      });
    };

$scope.eventName = {
  "title": "Event Name",
  "content": "e.g. Joe's Surprise Party"
};
$scope.startDate = {
  "title": "Start Date",
  "content": "e.g. 7/17/14"
};
$scope.startTime = {
  "title": "Start Time",
  "content": "e.g. 1:00 P.M."
};
$scope.endDate = {
  "title": "End Date",
  "content": "e.g. 7/17/14"
};
$scope.endTime = {
  "title": "End Time",
  "content": "e.g. 8:00 P.M."
};
$scope.locationName = {
  "title": "Location",
  "content": "e.g. 123 Madeup Street"
}

});


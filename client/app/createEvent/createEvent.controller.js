'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope, $http, $location) {
    $scope.location = "";
    $scope.location2 = "";
    $scope.dummyLocation = "";
    $scope.eventObj = {
      'startDate': "",
      'endDate': "",
      'eventLocation': "",
      'eventName': ""
    };
    $scope.create = function(){
      console.log("$scope.location:", $scope.location);

      console.log("$scope.dummy", $scope.dummyLocation);
      if($scope.location === '' || $scope.location2 === ''){
        alert('Directive did not update the location property in parent controller.');
      } else {
        alert('Yay. Location: ' + $scope.eventObj.eventLocation);
      }
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
};

}) //Controller
  .directive('googlePlaces', function(){
    return {
      restrict:'E',
      replace:true,
      // transclude:true,
      scope: {location:'='},
      template: '<input id="google_places_ac" name="google_places_ac" type="text" class="input-block-level form-control"/>',
      link: function($scope, elm, attrs){
        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();

          var location = place.geometry.location.lat();
          var location2 = place.geometry.location.lng();
          $scope.$apply(function(){
            $scope.location = location;
            $scope.location2 = location2;
          }); 
        });

      }
    }
  });


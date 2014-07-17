'use strict';

angular.module('goApp')
  .controller('FindEventCtrl', function ($scope) {
    $scope.location = '';

    $scope.doSearch = function(){
      if($scope.location === ''){
        alert('Directive did not update the location property in parent controller.');
      } else {
        alert('Yay. Location: ' + $scope.location);
      }
    };
  })
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
          $scope.location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
          $scope.$apply();
        });
      }
    }
  });

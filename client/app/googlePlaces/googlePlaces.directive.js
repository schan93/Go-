'use strict';

angular.module('goApp')
  .directive('googlePlaces', function() {
    return {
      restrict:'E',
      replace:true,
      // transclude:true,
      scope: {location:'='},
      template: '<input type="text" id="google_places_ac" name="location" class="form-control" required/>',
      link: function($scope, elm, attrs){
        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          var location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
          $scope.$apply(function(){
            $scope.location = place.formatted_address;
          }); 
        });
      }
    }
  });
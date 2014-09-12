'use strict';

angular.module('goApp')
  .directive('googlePlaces', function() {
    return {
      restrict:'E',
      replace:true,
      // require: 'ngModel',
      // transclude:true,
      scope: {ngModel:'=?', location:'=', coords:'=?'},
      template: '<input id="google_places_ac" class="form-control" name="google_places_ac" input="text" required/>',
      link: function($scope, elm, attrs){
        $scope.coords = {
          latitude: 0,
          longitude: 0
        };
        var autocomplete = new google.maps.places.Autocomplete($("#google_places_ac")[0], {});
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
          var place = autocomplete.getPlace();
          var location = place.geometry.location.lat() + ',' + place.geometry.location.lng();
          $scope.$apply(function(){
            $scope.coords.latitude = place.geometry.location.lat();
            $scope.coords.longitude = place.geometry.location.lng();
            $scope.location = place.formatted_address;
          }); 
        });
      }
    }
  });

'use strict';

angular.module('goApp')
  .controller('FindEventCtrl', function ($scope, $http) {
    $scope.events = [];
    $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
      });

    $scope.mapObj = {
      center: {
        latitude: 0,
        longitude: 0
      },
      options: {
        scrollwheel: true
      },
      bounds: {},
      zoom: 1
    };
    $scope.googleMapObj = {};

    $scope.markerObj = {
      id: 0,
      coords: {},
      show: true,
      title: "hi",
      onClick: function() {
        console.log("Clicked!");
        $scope.markerObj.show = !$scope.markerObj.show;
        $scope.$apply();
      },
      closeClick: function() {
        $scope.markerObj.show = false;
        $scope.$apply();
      }
    };

    $scope.markerObjs = [];

    $scope.windowObj = {
      coords: {
        latitude: 0,
        longitude: 0
      },
      content: "hi",
      show: false
    };

    $scope.location = '';
    $scope.locationCoords = {};
    $scope.markerCount = 0;


    $scope.handleNoGeolocation = function(errorFlag) {
      if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
      } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
      }

      $scope.mapObj.center.latitude = 60;
      $scope.mapObj.center.longitude = 105;
      $scope.mapObj.zoom = 14;
    }

    $scope.doSearch = function() {
      // only execute if location is not empty
      if($scope.location !== "") {
        var latitude = $scope.locationCoords.latitude,
            longitude =  $scope.locationCoords.longitude;
        var point = new google.maps.LatLng(latitude, longitude);

        var markers = [];
        var marker = $scope.createMarker(++$scope.markerCount, latitude, longitude);
        marker.title = $scope.location;
        markers.push(marker);
        $scope.markerObjs = $scope.markerObjs.concat(markers);

        // check if point is within bounds and adjust viewport if it is not
        if(!($scope.googleMapObj.getGMap().getBounds().contains(point))) {
          $scope.googleMapObj.getGMap().fitBounds($scope.googleMapObj.getGMap().getBounds().extend(point));
        }
      }
    }

    // create and return a new marker initializing all attributes
    $scope.createMarker = function(id, latitude, longitude) {
      var marker = {
        id: id,
        latitude: latitude,
        longitude: longitude,
        show: false,
        title: ""
      };
      marker.onClick = function() {
        console.log("Clicked!");
        marker.show = !marker.show;
      };
      marker.closeClick = function() {
        marker.show = false;
      };
      return marker;
    }

    // for development purposes
    $scope.displayMarkers = function() {
      var markers = [];
      for(var i=0; i < $scope.events.length; i++) {
        // skip event if location is empty
        if($scope.events[i].eventLocation === "")
          continue;

        var latitude = $scope.events[i].eventLocationLat,
            longitude = $scope.events[i].eventLocationLng;
        var point = new google.maps.LatLng(latitude, longitude);
        var marker = $scope.createMarker(++$scope.markerCount, latitude, longitude);
        marker.title = $scope.events[i].eventName;
        markers.push(marker);

        // check if point is within bounds and adjust viewport if it is not
        if(!($scope.googleMapObj.getGMap().getBounds().contains(point))) {
          $scope.googleMapObj.getGMap().fitBounds($scope.googleMapObj.getGMap().getBounds().extend(point));
        }
      }
      $scope.markerObjs = $scope.markerObjs.concat(markers);
    }

    // Use HTML5 geolocation to initialize map
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        $scope.$apply(function() {
          $scope.mapObj.center.latitude = position.coords.latitude;
          $scope.mapObj.center.longitude = position.coords.longitude;
          $scope.mapObj.zoom = 14;
  
          var marker = new Object();
          marker.id = 1;
          marker.show = false;
          marker.title = "You are here!";
          marker["latitude"] = position.coords.latitude;
          marker["longitude"] = position.coords.longitude;
          marker.onClick = function() {
            console.log("Clicked!");
            marker.show = !marker.show;
          };
          var markers = [];
          markers.push(marker);
          $scope.markerObjs = markers;
          $scope.markerCount++;
        });
      }, function() {
        $scope.handleNoGeolocation(true);
        $scope.$apply();
      });
    } else {
      // Browser doesn't support Geolocation
      $scope.handleNoGeolocation(false);
    }

/*
    var origin1 = new google.maps.LatLng($scope.mapObj.center.latitude, $scope.mapObj.center.longitude);
    var origin2 = "Greenwich, England";
    var destinationA = "Stockholm, Sweden";
    var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB]
      }, callback);

    function callback(response, status) {
      if (status == google.maps.DistanceMatrixStatus.OK) {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
            }
          }
        }
    }
*/
  });

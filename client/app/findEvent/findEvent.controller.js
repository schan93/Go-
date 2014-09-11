'use strict';

angular.module('goApp')
  .controller('FindEventCtrl', function ($scope, $http, $q) {
    /* 
     * Object declarations
     */

    // need two different arrays
    // e.g. if searching via distance, need events with location
    // if searching via category, location doesn't matter
    // ...then again, you might search using both filters (distance
    // and category), so you'll end up using events anyway... we'll
    // see. keeping them separate in case.
    $scope.events = [];
    $scope.eventsWLocation = [];

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

    // For distance matrix results
    $scope.parsed = []; // possible doesn't need to be in $scope. could be local var in function.
    $scope.searchResults = [];

    $scope.selectedIcon = "";
    $scope.icons = [{"value":5, "label":"5 miles"},
                    {"value":10, "label":"10 miles"},
                    {"value":15, "label":"15 miles"},
                    {"value":20, "label":"20 miles"},
                    {"value":50, "label":"50 miles"},
                    {"value":51, "label":"> 50 miles"}];

    $scope.isSearch = false;

    /*
     * Function definitions
     */

    // Error handler for geolocation, **need to make javascript pop-up
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

    // From Google Maps Distance Matrix API reference:
    // Maximum of 25 origins or 25 destinations per request; and
    // At most 100 elements (origins times destinations) per request.

    // Executed when "Search" button is pressed.
    // Makes call to GMaps Distance Matrix API and then receives
    // response. On success, parses the data and filters it.
    $scope.doSearch = function() {
      // if searching again, need to clear previous values
      $scope.parsed = [];
      $scope.searchResults=[];

      $scope.promise = calculateDistance();
      $scope.promise.then(
        // status is OK
        function(response) {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;

          // Parse data, refer to GMaps DM example for data
          // structure of response.
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              var element = results[j];
              var data = new Object();
              // convert to miles. if using meters, delete constant.
              data.distanceValue = element.distance.value/1609.34;
              data.distanceText = element.distance.text;
              data.duration = element.duration.text;
              data.from = origins[i];
              data.to = destinations[j];
              $scope.parsed.push(data);
            }
          }

          // Extract events that match search criteria (distance)
          for(var i = 0; i < $scope.parsed.length; i++) {
            if($scope.selectedIcon !== 51) {
              if($scope.parsed[i].distanceValue <= $scope.selectedIcon)
                $scope.searchResults.push($scope.eventsWLocation[i]);
            }
            else {
              if($scope.parsed[i].distanceValue > $scope.selectedIcon - 1) {
                $scope.searchResults.push($scope.eventsWLocation[i]);
              }
            }
          }
          // Activate ng-show for listview of search results next to map
          $scope.isSearch = true;
        },
        // status is not OK
        function(status) {
          alert("DistanceMatrixStatus error: " + status);
        }
      );
    }

    // make call to Google Maps Distance Matrix API, return
    // response in promise.
    var calculateDistance = function() {
      // set origin and destinations for distance matrix parameters
      var origin = new google.maps.LatLng($scope.markerObjs[0].latitude, $scope.markerObjs[0].longitude);
      var destinations = [];

      // add all events in database to destinations
      for(var i = 0; i < $scope.eventsWLocation.length; i++) {
        destinations[i] = new google.maps.LatLng($scope.eventsWLocation[i].eventLocationLat, $scope.eventsWLocation[i].eventLocationLng);
      }

      var service = new google.maps.DistanceMatrixService();
      var q = $q.defer();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        }, function(response, status) {
          if (status == google.maps.DistanceMatrixStatus.OK) {
            q.resolve(response);
          }
          else {
            q.reject(status);
          }
        });
      return q.promise;
    }

    /*
     * Initialization code
     */

    // Get and store events from database
    $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
        // delete events from data that don't have locations
        for(var i = 0; i < data.length; i++) {
          if(data[i].eventLocation === "")
            data.splice(i,1);
        }
        $scope.eventsWLocation = data;
      });

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
     * Obsolete development code, but saved for reference purposes
     */

    // Display markers of ALL events currently in database (that have a location)
    // $scope.displayMarkers = function() {
    //   var markers = [];
    //   for(var i=0; i < $scope.events.length; i++) {
    //     // skip event if location is empty
    //     if($scope.events[i].eventLocation === "")
    //       continue;

    //     var latitude = $scope.events[i].eventLocationLat,
    //         longitude = $scope.events[i].eventLocationLng;
    //     var point = new google.maps.LatLng(latitude, longitude);
    //     var marker = $scope.createMarker(++$scope.markerCount, latitude, longitude);
    //     marker.title = $scope.events[i].eventName;
    //     markers.push(marker);

    //     // check if point is within bounds and adjust viewport if it is not
    //     if(!($scope.googleMapObj.getGMap().getBounds().contains(point))) {
    //       $scope.googleMapObj.getGMap().fitBounds($scope.googleMapObj.getGMap().getBounds().extend(point));
    //     }
    //   }
    //   $scope.markerObjs = $scope.markerObjs.concat(markers);
    // }

    /*
     * This was code that added a new marker according to whatever location you searched for
     * in the search bar. I'm saving this here if we need to refer to it later. Probably will
     * delete it soon since it's not too difficult to implement.
     */
    // only execute if location is not empty
    // if($scope.location !== "") {
    //   var latitude = $scope.locationCoords.latitude,
    //       longitude =  $scope.locationCoords.longitude;
    //   var point = new google.maps.LatLng(latitude, longitude);

    //   var markers = [];
    //   var marker = $scope.createMarker(++$scope.markerCount, latitude, longitude);
    //   marker.title = $scope.location;
    //   markers.push(marker);
    //   $scope.markerObjs = $scope.markerObjs.concat(markers);

    //   // check if point is within bounds and adjust viewport if it is not
    //   if(!($scope.googleMapObj.getGMap().getBounds().contains(point))) {
    //     $scope.googleMapObj.getGMap().fitBounds($scope.googleMapObj.getGMap().getBounds().extend(point));
    //   }
    // }
  });

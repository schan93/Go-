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
    $scope.googlePlacesInput = "";
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

    // For ng-show/hide distance select and search bar
    $scope.enableNearby = true;
    $scope.enableSearch = true;

    /*
     * Function definitions
     */

    // Error handler for geolocation
    $scope.handleNoGeolocation = function(errorFlag) {
      if (errorFlag) {
        alert("Error: The Geolocation service failed.");
      } else {
        alert("Error: Your browser doesn't support geolocation.");
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

    // MAXIMUM NUMBER OF API CALLS:
    // From Google Maps Distance Matrix API reference:
    // Maximum of 25 origins or 25 destinations per request; and
    // At most 100 elements (origins times destinations) per request.

    // doSearch()
    // What this function does:
    // Executed when "Search" button is pressed.
    // Makes call to GMaps Distance Matrix API and then receives
    // response. On success, parses the data and filters it.

    // notes:
    // 1. possibly could be cleaner using $scope.enableSearch and such.
    // 2. in the future can probably use distance selection with location search
    //    so you can set your own radius instead of defaulting to 10.
    // 3. windows are consistently inconsistent. THEORY: they sometimes don't
    //    show up after you've already included the same markers in a previous
    //    search, e.g. you search nearby with radius 5 miles, then search with
    //    radius 10, the markers from radius 5 will show up again obviously, but
    //    the windows won't work.
    $scope.doSearch = function() {
      // No search criteria has been entered, exit.
      if($scope.enableNearby && $scope.enableSearch)
        return;

      // if searching again, need to clear previous values
      $scope.parsed = [];
      $scope.searchResults = [];
      $scope.markerObjs.splice(1,$scope.markerCount-1);
      $scope.markerCount = 1;

      // pop geolocation marker, this is in case we are searching in a different location,
      // so that when the map refits the bounds, the marker won't be factored in. pushed
      // back at the end of doSearch().
      var geoMarker = $scope.markerObjs.shift();
      var origin = new google.maps.LatLng(geoMarker.latitude, geoMarker.longitude);
      if($scope.enableSearch) {
        origin = new google.maps.LatLng($scope.locationCoords.latitude, $scope.locationCoords.longitude);
      }

      $scope.promise = calculateDistance(origin);
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

          // reset center and zoom all the way in so map can resize accordingly.
          // might be more efficient way of doing this. I'm not sure what. but this
          // works.
          var newCenter = new google.maps.LatLng(geoMarker.latitude, geoMarker.longitude);
          var distComp = $scope.selectedIcon;
          if($scope.enableSearch) {
            newCenter = new google.maps.LatLng($scope.locationCoords.latitude, $scope.locationCoords.longitude);
            distComp = 10; // set radius to 10 for specific location search
          }
          $scope.googleMapObj.getGMap().setCenter(newCenter);
          $scope.googleMapObj.getGMap().setZoom(19);

          // Extract events that match search criteria (distance)
          var markers = [];
          for(var i = 0; i < $scope.parsed.length; i++) {
            if((distComp < 51 && $scope.parsed[i].distanceValue <= distComp)
              || (distComp >= 51 && $scope.parsed[i].distanceValue > distComp - 1)) {
              $scope.searchResults.push($scope.eventsWLocation[i]);

              var latitude = $scope.eventsWLocation[i].eventLocationLat,
                  longitude = $scope.eventsWLocation[i].eventLocationLng;
              var point = new google.maps.LatLng(latitude, longitude);
              var marker = $scope.createMarker(++$scope.markerCount, latitude, longitude);
              marker.title = $scope.eventsWLocation[i].eventName;
              markers.push(marker);

              // check if point is within bounds and adjust viewport if it is not
              if(!($scope.googleMapObj.getGMap().getBounds().contains(point))) {
                $scope.googleMapObj.getGMap().fitBounds($scope.googleMapObj.getGMap().getBounds().extend(point));
              }
            }
          }
          $scope.markerObjs = $scope.markerObjs.concat(markers);
          // Activate ng-show for listview of search results next to map
          $scope.isSearch = true;
        },
        // status is not OK
        function(status) {
          alert("DistanceMatrixStatus error: " + status);
        }
      );

      // push back geolocation marker
      $scope.markerObjs.unshift(geoMarker);
    }

    // make call to Google Maps Distance Matrix API, return
    // response in promise.
    var calculateDistance = function(origin) {
      // set origin and destinations for distance matrix parameters
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

    // if any text is entered in the search bar, ng-hide distance select
    $scope.$watch(
      function() { return $scope.googlePlacesInput; },
      function(newValue, oldValue) {
        if(newValue !== oldValue) {
          if(newValue !== "")
            $scope.enableNearby = false;
          else
            $scope.enableNearby = true;
        }
      }
    );

    // if a distance is selected, ng-hide search bar
    $scope.$watch(
      function() { return $scope.selectedIcon; },
      function(newValue, oldValue) {
        if(newValue !== oldValue) {
          if(newValue !== "")
            $scope.enableSearch = false;
          else
            $scope.enableSearch = true;
        }
      }
    );

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

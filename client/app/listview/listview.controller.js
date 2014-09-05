'use strict';

angular.module('goApp')
  .controller('ListviewCtrl', function (Auth, $scope, $http, $location, listviewService, $routeParams, $cookieStore, $modal, User, $window) {
    $scope.location = "";
    $scope.locationCoords = {};
    $scope.events = [];
    $scope.individualEvent = {};
    $scope.eventId = "";
    $scope.showEditEventPage = false;
    $scope.eventObj = {
      'startDate': "",
      'endDate': "",
      'eventLocation': "",
      'eventName': "",
      'attendees': [],
      'invited': [],
      'creator': "",
      'eventLocationLat': 0,
      'eventLocationLng': 0
    };  
    
    $scope.currentUser = {};

    $scope.getEvent = function(event){
      $scope.individualEvent = event;
    };

    //Set who the current user is
    $http.get('/api/users/me')
      .then(function(result){
        $scope.currentUser = result.data;
      });

    $scope.usersAttending = [];
    $scope.temp = [];
 
    $scope.usersAttendingTest = {};
    //Getting All Events
    $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
      });

    $scope.passUser = function(user){
      listviewFactory.setUser(user);
    };


    $scope.grabEventData = function(eventId){
      $scope.show.event = false;
      listviewFactory.addEvent(eventId);
    };

    // Keeping modal code in case we end up using it. We can delete it in a bit.
    /*
    var editEventModal = $modal({
      title: 'Edit Event',
      scope: $scope,
      animation: 'am-fade-and-scale',
      template: 'app/listview/editEvent.html',
      show: false
    });
    */
    $scope.showEditEvent = function() {
      $scope.showEditEventPage = true;
      //editEventModal.$promise.then(editEventModal.show);
    };
    $scope.hideEditEvent = function() {
      $scope.showEditEventPage = false;
      $http.get('/api/events')
        .success(function(data, status, headers, config) {
          $scope.events = data;
        });
      //$window.location.reload(); // used this function because the googlePlaces directive wasn't reloading
                                 // correctly when I simply activated the ng-show again for the listview
      //editEventModal.$promise.then(editEventModal.hide);
    };

    // for development purposes
    $scope.deleteEvent = function(id) {
      $http.delete('/api/events/' + $scope.events[id]._id)
        .success(function(data) {
          console.log("Success. Event " + id + " deleted.");
        });
      $http.get('/api/events')
        .success(function(data, status, headers, config) {
          $scope.events = data;
        });
    }

    $scope.attending = function(event, id){
      if($cookieStore.get('token')){
        $scope.currentUser = Auth.getCurrentUser();
      }
      $http.put('/api/events/' + event._id, $scope.currentUser)
        .success(function(data) {
          console.log("Success. Event " + event.eventName + " was edited.");
        });
      $http.put('/api/users/' + $scope.currentUser._id, event)
        .success(function(data){
          console.log("Success. User " + $scope.currentUser.name);
        });
    }
    // The only thing that doesn't work right now for editEvent has to do
    // with the googlePlaces custom directive. The field does not automatically
    // fill in if you put $scope.eventObj.eventLocation as the ng-model. As a
    // result, you have to retype the location when you edit an event.
    $scope.editEvent = function(id) {
      $scope.eventObj.eventName = $scope.events[id].eventName;
      $scope.eventObj.eventLocation = $scope.events[id].eventLocation;
      $scope.eventObj.startDate = $scope.events[id].startDate;
      $scope.eventObj.endDate = $scope.events[id].endDate;
      $scope.eventId = id;
    }
    $scope.submitEvent = function() {
      if($scope.location !== "") {
        $scope.eventObj.eventLocation = $scope.location;
        $scope.eventObj.eventLocationLat = $scope.locationCoords.latitude;
        $scope.eventObj.eventLocationLng = $scope.locationCoords.longitude;
      }
      $scope.eventObj.startDate = Date.parse($scope.eventObj.startDate);
      $scope.eventObj.endDate = Date.parse($scope.eventObj.endDate);

      $http.put('/api/events/' + $scope.events[$scope.eventId]._id, $scope.eventObj)
        .success(function(data) {
          console.log("Success. Event " + $scope.eventId + " was edited.");
        });

      $scope.hideEditEvent();
    }
  });

'use strict';

angular.module('goApp')
  .controller('ListviewCtrl', function ($scope, $http, $location, listviewFactory, $routeParams, $modal, $window) {
    $scope.location = "";
    $scope.events = [];
    $scope.eventId = "";
    $scope.eventObj = {
      'startDate': "",
      'endDate': "",
      'eventLocation': "",
      'eventName': "",
      'attendees': []
    };

    $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
      });

    $scope.show = {
      'event': true
    };

    $scope.showEditEventPage = false;

    $scope.grabEventData = function(events, index){
      $scope.show.event = false;
      listviewFactory.addEvent(events, index);
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
      $window.location.reload(); // used this function because the googlePlaces directive wasn't reloading
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
      $scope.eventObj.eventLocation = $scope.location;
      $scope.eventObj.startDate = Date.parse($scope.eventObj.startDate);
      $scope.eventObj.endDate = Date.parse($scope.eventObj.endDate);

      $http.put('/api/events/' + $scope.events[$scope.eventId]._id, $scope.eventObj)
        .success(function(data) {
          console.log("Success. Event " + $scope.eventId + " was edited.");
        });

      $scope.hideEditEvent();
    }
  });

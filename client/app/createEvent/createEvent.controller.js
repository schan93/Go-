'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope, $http, $location, Auth, listviewService) {

    $scope.showEditEventPage = false;//listviewService.getEditEventPage();
    $scope.currentUser = {};
    $scope.invitedFriends = [];

    $scope.location = "";
    $scope.locationCoords = {};
    $scope.place ="";
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

    $http.get('/api/users/me')
      .then(function(result){
        $scope.currentUser = result.data;
    });


    $scope.createForm = function(isValid){
      $scope.eventObj.eventLocation = $scope.location;
      $scope.eventObj.eventLocationLat = $scope.locationCoords.latitude;
      $scope.eventObj.eventLocationLng = $scope.locationCoords.longitude;
      $scope.eventObj.startDate = Date.parse($scope.eventObj.startDate);
      $scope.eventObj.endDate = Date.parse($scope.eventObj.endDate);
      $scope.eventObj.creator = $scope.currentUser.username;
      console.log("$scope.eventObj: ", $scope.eventObj);
      $http.post('/api/events', $scope.eventObj).
      success(function(data){
        $location.path('/');
      });
      if(isValid){
        alert('Event successfully created!');
      }
    };



    $scope.addFriendsToInvite = function(){
      $scope.eventObj.invited = [];
      for(var i = 0; i < $scope.invitedFriends.length; i++){
        var friendObj = {username: ""};
        friendObj.username = $scope.invitedFriends[i].username;
        $scope.eventObj.invited.push(friendObj);
      }
      /*for(var i = 0; i < $scope.invitedFriends.length; i++){
        $http.put('/api/events/inviteFriends/' + $scope.invitedFriends[i]._id)
          .success(function(data){
            console.log("Successfully added in: ", $scope.invitedFriends[i].username);
          });
      }*/
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

});

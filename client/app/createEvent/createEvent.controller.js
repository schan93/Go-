'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope, $http, $location, Auth) {

    $scope.currentUser = {};
    $scope.invitedFriends = [];

    $scope.location = "";
    $scope.place ="";
    $scope.eventObj = {
      'startDate': "",
      'endDate': "",
      'eventLocation': "",
      'eventName': "",
      'attendees': [],
      'invited': [],
      'creator': ""
    };

    $http.get('/api/users/me')
      .then(function(result){
        $scope.currentUser = result.data;
    });


    $scope.create = function(){
      $scope.eventObj.eventLocation = $scope.location;
      $scope.eventObj.startDate = Date.parse($scope.eventObj.startDate);
      $scope.eventObj.endDate = Date.parse($scope.eventObj.endDate);
      $scope.eventObj.creator = $scope.currentUser.username;
      $http.post('/api/events', $scope.eventObj).
      success(function(data){
        $location.path('/');
      });
    };



    $scope.addFriendsToInvite = function(){
      $scope.eventObj.invited = [];
      for(var i = 0; i < $scope.invitedFriends.length; i++){
        $scope.eventObj.invited[i] = $scope.invitedFriends[i];
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

'use strict';

angular.module('goApp')
.controller('ProfileCtrl', function ($scope, $cookieStore, $routeParams, User, Auth, $http, filterFilter) {

  $scope.individualEvent = {};
  $scope.showEditEventPage = false;
  $scope.selectedFriends = [];
  $scope.eventId = "";
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
      $scope.user = result.data;
      $http.get('/api/users/events/' + $scope.user._id)
        .success(function(data, status, headers, config){
        //Used for displaying data
          $scope.currentUser = data;
      });
  });

  $scope.showEditEvent = function() {
    $scope.showEditEventPage = true;
    //editEventModal.$promise.then(editEventModal.show);
  };


//Pending = I have a friend request pending
//Requested = I have requested someone to be my friend

$scope.addPendingFriend = function(){
  console.log("$selected freinds length: ", $scope.selectedFriends.length);
  for(var i = 0; i < $scope.selectedFriends.length; i++){
    $http.put('/api/users/friends/pending/confirm/' + $scope.user.username, $scope.selectedFriends[i])
    .success(function(data){
    });

    var friendObject = {
      username: $scope.user.username, 
      invited: false, 
      pending: true, 
      requested: true
    };

    //In this case, user == schan93. We loop through HIS array and we get the one that matches the user's username
    $http.put('/api/users/friends/pending/confirm/' + $scope.selectedFriends[i].username, 
      friendObject)
    .success(function(data){
    });
    $scope.selectedFriends[i].requested = true;
  }
  friendHelper.friendsToAdd = false;
};

$scope.editEvent = function(id) {
  $scope.eventObj.eventName = $scope.currentUser.eventsAttending[id].eventName;
  $scope.eventObj.eventLocation = $scope.currentUser.eventsAttending[id].eventLocation;
  $scope.eventObj.startDate = $scope.currentUser.eventsAttending[id].startDate;
  $scope.eventObj.endDate = $scope.currentUser.eventsAttending[id].endDate;
  $scope.eventId = id;
}


$scope.getEvent = function(event){
  $scope.individualEvent = event;
}

});
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
    'startTime': "",
    'endTime': "",
    'eventLocation': "",
    'eventName': "",
    'attendees': [],
    'invited': [],
    'creator': ""
  };
  $scope.userAlreadyAttending = {
    'alreadyAttending': false
  };

  $http.get('/api/users/me')
    .then(function(result){
      $scope.user = result.data;
      $http.get('/api/users/events/' + $scope.user._id)
        .success(function(data, status, headers, config){
        //Used for displaying data
          $scope.currentUser = data;
          for(var i = 0; i < $scope.currentUser.eventsAttending.length; i++){
            for(var k = 0; k < $scope.currentUser.eventsAttending[i].attendees.length; k++){
              if($scope.currentUser.eventsAttending[i].attendees[k] === $scope.currentUser.username){
                $scope.userAlreadyAttending.alreadyAttending = true;
              }
            }
          }
      });
  });

  $scope.showEditEvent = function() {
    $scope.showEditEventPage = true;
    //editEventModal.$promise.then(editEventModal.show);
  };

    $scope.deleteEvent = function(event) {
      //$scope.events.splice($scope.events.indexOf(event), 1); 
      //console.log("Delted: ", event);
      var confirmDelete = confirm("Are you sure you want to delete this event?");
      if(confirmDelete == true){
        $http.delete('/api/events/' + $scope.events[$scope.events.indexOf(event)]._id)
          .success(function(data) {
            console.log("Success. Event " + $scope.events[$scope.events.indexOf(event)].eventName + " deleted.");
          });
        $http.get('/api/events')
          .success(function(data, status, headers, config) {
            $scope.events = data;
          });
        }
        else{
          
        }
    }

//Pending = I have a friend request pending
//Requested = I have requested someone to be my friend

/*$scope.addPendingFriend = function(){
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
};*/

    $scope.attending = function(event){
      $scope.userAlreadyAttending.alreadyAttending = true;
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
    };


$scope.editEvent = function(id) {
  console.log("Event Obj: ", $scope.events[id]);
  $scope.eventObj.eventName = $scope.events[id].eventName;
  $scope.eventObj.eventLocation = $scope.events[id].eventLocation;
  $scope.eventObj.startDate = $filter('date')($scope.events[id].startDate, 'shortDate');
  $scope.eventObj.endDate = $filter('date')($scope.events[id].endDate, 'shortDate');
  $scope.eventObj.startTime = $filter('date')($scope.events[id].startTime, 'shortTime');
  $scope.eventObj.endTime = $filter('date')($scope.events[id].endTime, 'shortTime');
  console.log("Event Obj: ", $scope.eventObj.startTime);

  for(var i = 0; i < $scope.events[id].invited.length; i++){
    $scope.eventObj.invited.push($scope.events[id].invited[i]);
  }
  $scope.eventId = id;
}


$scope.getEvent = function(event){
  $scope.individualEvent = event;
}

});
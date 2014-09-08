'use strict';

angular.module('goApp')
  .controller('CreateEventCtrl', function ($scope, $http, $location, Auth, listviewService) {


    $scope.showEditEventPage = false;//listviewService.getEditEventPage();
    $scope.currentUser = {};
    $scope.invitedFriends = [];
    $scope.date = new Date();
    $scope.submitted = false;
    $scope.location = "";
    $scope.place ="";
    //Temporary variables because when we try to do Date.parse, our variables turn into dates which is not what we want
    $scope.temp = {
      'startDate': "",
      'startTime': "",
      'endTime': "",
      'endDate': ""
    };

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

    $http.get('/api/users/me')
      .then(function(result){
        $scope.currentUser = result.data;
    });


    $scope.createForm = function(isValid){
      $scope.submitted = true;
      $scope.temp.startDate = Date.parse($scope.eventObj.startDate);
      $scope.temp.endDate = Date.parse($scope.eventObj.endDate);
      if($scope.temp.startDate < $scope.date || $scope.temp.endDate < $scope.temp.startDate
        || isNaN($scope.temp.startDate || isNaN($scope.temp.endDate))){
        isValid = false;
        console.log("Invalid date.")
      }
      else if($scope.eventObj.startTime > $scope.eventObj.endTime || 
        $scope.eventObj.startTime === $scope.eventObj.endTime ||
        $scope.eventObj.startTime === undefined || $scope.eventObj.endTime === undefined){
        isValid = false;
        console.log("Invalid time.");
      }
      if(isValid){
        $scope.eventObj.eventLocation = $scope.location;
        $scope.eventObj.startDate = Date.parse($scope.eventObj.startDate);
        $scope.eventObj.creator = $scope.currentUser.username;
        $http.post('/api/events', $scope.eventObj).
        success(function(data){
          console.log("Data: ", data);
          for(var i = 0; i < data.invited.length; i++){
            $http.put('/api/users/set/invited/events/current/' + data.invited[i].username, data)
            .success(function(data){
              console.log("Successfully invited Friends to event");
            });
          }
          $location.path('/');
        });
      }
      else{
        console.log("Not valid.");
      }
    };

    $scope.addFriendsToInvite = function(){
      //Incase we need to add/delete friends from being invited
      $scope.eventObj.invited = [];
      for(var i = 0; i < $scope.invitedFriends.length; i++){
        var friendObj = {username: ""};
        friendObj.username = $scope.invitedFriends[i].username;
        $scope.eventObj.invited.push(friendObj);
      }
    }; 
});

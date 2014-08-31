'use strict';

angular.module('goApp')
  .controller('UserProfileCtrl', function ($scope, $cookieStore, User, Auth, $http, listviewFactory, $routeParams) {

    $scope.username = $routeParams.username;
    $scope.user = {};
    $scope.individualEvent = {};

    $scope.getEvent = function(event){
      $scope.individualEvent = event;
    };
    
    $scope.currentUserViewing = {};
    $scope.events  = [];

    $http.get('/api/users/me')
    .then(function(result){
      $scope.user = result.data;
    });

    $http.get('/api/users/users/' + $scope.username)
    .success(function(data, status, headers, config){
      //Get the users profile based on whoever you click
      $scope.currentUserViewing = data;
      $scope.realCurrentUserViewing = data;
      $http.get('/api/users/events/' + $scope.currentUserViewing._id)
        .success(function(data, status, headers, config){
          //Used for displaying the events that an individual is going to (we need to populate them)
          $scope.currentUserViewing = data;
        }); 
    });

    $scope.friend = {
      'friendText': "Friend me!",
      'friendRequest': false
    };

//Request friend
    $scope.friendMe = function(){
      $scope.friend.friendRequest = true;
      $scope.friend.friendText = "Friend Request Sent!"
      console.log("User: ", $scope.user);

      $http.put('/api/users/' + $scope.user._id + "/" + $scope.user.username, $scope.realCurrentUserViewing)
        .success(function(data) {
          console.log("Success. Friend " + $scope.user.username + " has requested to be friends with " + 
            $scope.realCurrentUserViewing.username);
        });

      $http.put('/api/users/friends/' + $scope.realCurrentUserViewing._id + "/" + 
        $scope.realCurrentUserViewing.username, $scope.user)
        .success(function(data) {
          console.log("Success. Friend " + $scope.realCurrentUserViewing.username + 
            " has requested to be friends with " + 
            $scope.user.username);
        }); 
    };
  });
'use strict';

angular.module('goApp')
  .controller('ProfileCtrl', function ($scope, $cookieStore, User, Auth, $http) {
  	$scope.currentUser = Auth.getCurrentUser();

    $http.get('/api/users/' + $scope.currentUser._id)
      .success(function(data, status, headers, config) {
        $scope.eventsAttending = data;
        for(var i = 0; i < $scope.eventsAttending.eventsAttending.length; i++){
          console.log("Testing username: ", $scope.eventsAttending.eventsAttending[i].eventName);
        }
    });

    $scope.friendMe = function(){
      console.log("Friend me: ", $scope.currentUser._id);
    };
  });
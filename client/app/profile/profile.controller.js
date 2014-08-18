'use strict';

angular.module('goApp')
  .controller('ProfileCtrl', function ($scope, $cookieStore, User, Auth, $http) {
  	$scope.currentUser = Auth.getCurrentUser();

    $http.get('/api/users/' + $scope.currentUser._id)
      .success(function(data, status, headers, config) {
        $scope.eventsAttending = data;
    });

    $scope.friendMe = function(){
    };
  });
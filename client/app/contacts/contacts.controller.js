'use strict';

angular.module('goApp')
  .controller('ContactsCtrl', function ($scope, $http, Auth) {
  	
  	$http.get('/api/users/me')
  	  .then(function(result){
  	    $scope.currentUser = result.data;
  		});
  });

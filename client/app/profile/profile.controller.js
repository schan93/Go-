'use strict';

angular.module('goApp')
  .controller('ProfileCtrl', function ($scope, $cookieStore, User, $http) {
  	   	$scope.currentUser = User.get();
  	   	$scope.getUser = function(){
    		if($cookieStore.get('token')){
      			$scope.currentUser = User.get();
    		}
    	};
   	 $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
      });//Eventually need to hide events from each individual person...

  })
  .directive('profileDirective', function(){
    return {
      restrict: 'E',
      template: 'Name: {{currentUser.userName}} Email: {{currentUser.email}}',
      link: function(scope, elems, attrs){
    		if($cookieStore.get('token')){
      			scope.currentUser = User.get();
    		}
    	}

    };//Doesn't do anything.
  });

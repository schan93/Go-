'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $http, $routeParams) {
  	//Because ng-repeat creates a new scope, we can access the event variable in our ng-repeat using $scope
  	var toClass = {}.toString;
  	console.log("Type of events ", $scope.events);
  	console.log("Scope events: ", $scope.events);
  	$scope.event = $scope.events[$routeParams.id];
  });
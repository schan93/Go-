'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $http, $routeParams, $rootScope, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();

  });
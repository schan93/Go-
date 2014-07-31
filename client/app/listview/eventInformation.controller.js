'use strict';

angular.module('goApp')
  .controller('EventInformationCtrl', function ($scope, $http, $routeParams, $rootScope, listviewFactory) {

  	$scope.event = listviewFactory.getEvent();

    //We need to somehow pass in the logged in user's name
    $scope.attending = function(){
      $scope.event.atendees.push(user.name); 
    };

  });
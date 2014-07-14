'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/findevent', {
        templateUrl: 'app/findEvent/findEvent.html',
        controller: 'FindEventCtrl'
      });
  });

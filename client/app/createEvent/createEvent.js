'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/createevent', {
        templateUrl: 'app/createEvent/createEvent.html',
        controller: 'CreateEventCtrl'
      });
  });

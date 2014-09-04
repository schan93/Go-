'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/invitedEvents', {
        templateUrl: 'app/invitedEvents/invitedEvents.html',
        controller: 'InvitedEventsCtrl'
      });
  });

'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/users/:username', {
        templateUrl: 'app/userProfile/userProfile.html',
        controller: 'UserProfileCtrl'
      });
  });

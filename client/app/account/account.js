'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: '/',
        controller: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      });
  });
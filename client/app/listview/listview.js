'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listview', {
        templateUrl: 'app/listview/listview.html',
        controller: 'ListviewCtrl'
      })
      .when('/listview/:id', {
        templateUrl: 'app/listview/eventInformation.html',
        controller: 'EventInformationCtrl'
      })
      .when('/users/:username', {
        templateUrl: 'app/userProfile/userProfile.html',
        controller: 'UserProfileCtrl'
      });
  });

'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listview', {
        templateUrl: 'app/listview/listview.html',
        controller: 'ListviewCtrl'
      });
  });

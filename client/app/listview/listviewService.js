'use strict';

angular.module('listviewService', ['ngResource', 'ngRoute']).
  service('listviewService', function($resource, $routeParams, $http) {
    var eventObj = {};
    return {
      setEventObj: function(value){
        eventObj = value;
      },
      getEventObj: function(){
        return eventObj;
      }
    };
  });
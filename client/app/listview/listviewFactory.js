'use strict';

  angular.module('listviewService', ['ngResource', 'ngRoute']).
          factory('listviewFactory', function($resource, $routeParams) {
          	var eventTest = {};

          	var addEvent = function(events, index){
          			console.log("Index: ", index);
          			eventTest = events[index];
          	}

          	var getEvent = function(){
          		return eventTest;
          	}
          	return {
          		addEvent: addEvent,
          		getEvent: getEvent
          	};

            /*return $resource('api/events', {}, {
              query: { method: 'GET', isArray:true }
            }),*/



          });
'use strict';

  angular.module('listviewService', ['ngResource', 'ngRoute']).
          factory('listviewFactory', function($resource, $routeParams, $http) {
            var username = "";

            var setUser = function(user){
              username = user;
            };

            var getUser = function(){
              return username;
            };

          	return {
              getUser: getUser,
              setUser: setUser
          	};
          });
'use strict';

  angular.module('listviewService', ['ngResource']).
          factory('listviewFactory', function($resource) {
            return $resource('events/:id', {}, {
              get: { method: 'GET' }
            })
          });
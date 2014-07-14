'use strict';

angular.module('goApp')
  .factory('listviewFactory', function ($q, $http) {
    return {
      getEvents: function () {
        var deferred = $q.defer(),
          httpPromise = $http.get('/api/events');
 
        httpPromise.success(function (events) {
          deferred.resolve(events);
        })
          .error(function (error) {
            console.error('Error: ' + error);
          });
 
        return deferred.promise;
      }
    };
  });
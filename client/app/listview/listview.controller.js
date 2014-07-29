'use strict';

angular.module('goApp')
  .controller('ListviewCtrl', function ($scope, $http, $location, listviewFactory, $routeParams) {
  
    $http.get('/api/events')
      .success(function(data, status, headers, config) {
        $scope.events = data;
      });
      
      //or $scope.events = listviewFactory.query();

$scope.show = {
  'event': true
};

$scope.grabEventData = function(){
      $scope.show.event = false;
}


      //$scope.test = listviewFactory.get({show: $routeParams.id});


    //Get just 1 event
    //$scope.test = listviewFactory.get({id: $routeParams.id});
    /*$http.get({_id: id}, '/api/events')
      .success($routeParams.id, function(data, status, headers, config){
        $scope.test = data;
      });*/

    // listviewFactory.getEvents().then(function (events){
    //   $scope.teststuff = events;
    //   console.log("List view:" + events + " Test stuff: " + JSON.stringify($scope.teststuff, null, 4));
    //   }, function(error){ 
    //     console.error(error);
    //   });
  });

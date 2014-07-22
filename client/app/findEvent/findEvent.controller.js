'use strict';

angular.module('goApp')
  .controller('FindEventCtrl', function ($scope) {
    $scope.location = '';

    $scope.doSearch = function(){
      if($scope.location === ''){
        alert('Directive did not update the location property in parent controller.');
      } else {
        alert('Yay. Location: ' + $scope.location);
      }
    };
  });

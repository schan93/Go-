'use strict';

angular.module('goApp')
  .controller('SignupCtrl', function ($scope, Auth, $location) {
    $scope.signupUser = {};
    $scope.errors = {};

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.signupUser.name,
          email: $scope.signupUser.email,
          username: $scope.signupUser.username,
          password: $scope.signupUser.password
        })
        .then( function() {
          // Account created, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, function(error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    };
  });
'use strict';

angular.module('goApp')
  .controller('MainCtrl', function ($scope, $http, Auth, $location, $window, $modal) {
    var loginModal = $modal({title: 'Login', scope: $scope, animation: 'am-fade-and-slide-top', template: 'app/main/loginModal.html', show: false});
    var signupModal = $modal({title: 'Sign Up', scope: $scope, animation: 'am-fade-and-slide-top', template: 'app/main/signupModal.html', show: false});

    $scope.showLogin = function() {
      loginModal.$promise.then(loginModal.show);
    };
    $scope.hideLogin = function() {
      loginModal.$promise.then(loginModal.hide);
    };

    $scope.showSignup = function() {
      signupModal.$promise.then(signupModal.show);
    };
    $scope.hideSignup = function() {
      signupModal.$promise.then(signupModal.hide);
    };

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          username: $scope.user.username,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          loginModal.hide();
          $scope.user.name = "";
          $scope.user.email= "";
          $scope.user.username= "";
          $scope.user.password= "";
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
          $location.path('/');
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

    $scope.register = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          username: $scope.user.username,
          password: $scope.user.password
        })
        .then( function() {
          // Account created, redirect to home
          signupModal.hide();
          $scope.user.name = "";
          $scope.user.email= "";
          $scope.user.username= "";
          $scope.user.password= "";
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

          //$location.path('/');
        });
      }
    };

  });
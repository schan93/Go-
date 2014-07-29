'use strict';

angular.module('goApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/listview', {
        templateUrl: 'app/listview/listview.html',
        controller: 'ListviewCtrl'
      })
      .when('/listview/:id', {
        templateUrl: 'app/listview/eventInformation.html',
        controller: 'EventInformationCtrl'
      });
      /*.when('/event/:id', {
        templateUrl:'app/listview/eventInformation.html',
        controller: 'ListviewCtrl'
      });*/
  });
  /*.directive('listview', ['$compile', '$interpolate','$templateCache', function($compile, $interpolate, $templateCache) {
    return {
      restrict: 'EA',
      transclude: false,
      scope: {
        listviewId:'@listview',
        items: '=',
        methods: '='
      },
      templateUrl: function(element, attrs) {
        if(!attrs.template && !attrs.templateBase) return 'listview.html';
        attrs.template = attrs.template || 'listview.html';
        if(!attrs.templateBase) return attrs.template;
        var path = attrs.templateBase;
        if (path.substr(path.length - 1, 1) !== '/') path += '/';
        path += attrs.template;
        return path;
      },
      link: function(scope, element, attrs){
        attrs.$observe('columns', function(val){
          scope.columns = val.replace(/ /g,'').split(',');
        });
      },
      controller: function($scope, $interpolate, $compile, $templateCache){
        $scope.predicate = 'title';
        $scope.hideEvents = true;
        $scope.getTemplate = function (column) {
          var prefix = $scope.listviewId ? $scope.listviewId + '-' : '';
          var template = prefix + 'column-' + column + '.html';
          var html = $templateCache.get(template);
          return html ? template : 'column-' + 'default.html';
        };
        $scope._format = function(column, item){
          return this.methods && this.methods[column] ? this.methods[column](item[column], item) : item[column];
        };
        $scope.openEventInformation = function(){
          console.log("Hi");
        }
      }
    };
  }])
  .filter('capitalize', function () {
    return function (input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  });*/

'use strict';

describe('Controller: FindEventCtrl', function () {

  // load the controller's module
  beforeEach(module('goApp'));

  var FindEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindEventCtrl = $controller('FindEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Controller: ListviewCtrl', function () {

  // load the controller's module
  beforeEach(module('goApp'));

  var ListviewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListviewCtrl = $controller('ListviewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

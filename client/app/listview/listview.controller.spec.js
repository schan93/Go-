'use strict';

describe('Controller: ListviewCtrl', 'Controller: EventInformationCtrl', function () {

  // load the controller's module
  beforeEach(module('goApp'));

  var ListviewCtrl, EventInformationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListviewCtrl = $controller('ListviewCtrl', {
      $scope: scope
    });
    EventInformationCtrl = $controller('EventInformationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

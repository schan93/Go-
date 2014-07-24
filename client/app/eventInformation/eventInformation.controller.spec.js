'use strict';

describe('Controller: EventinformationCtrl', function () {

  // load the controller's module
  beforeEach(module('goApp'));

  var EventinformationCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EventinformationCtrl = $controller('EventinformationCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

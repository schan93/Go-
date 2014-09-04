'use strict';

describe('Controller: InvitedeventsCtrl', function () {

  // load the controller's module
  beforeEach(module('goApp'));

  var InvitedeventsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvitedeventsCtrl = $controller('InvitedEventsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

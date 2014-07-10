'use strict';

describe('Directive: listview', function () {

  // load the directive's module
  beforeEach(module('goApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<listview></listview>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the listview directive');
  }));
});
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var MainCtrl;

  // Initialize the controller
  beforeEach(inject(function(_$controller_) {
    MainCtrl = _$controller_;
  }));

  describe('$scope.message', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = MainCtrl('MainCtrl', {$scope: $scope});
    });

    it('should be true', function () {
      expect($scope.message).toBe('Angular Express Seed!');
    });
  });

});

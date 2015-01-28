'use strict';

describe('Controller: MainCtrl', function () {
  beforeEach(module('patchnoteApp'));

  var createController, $httpBackend;

  // Initialize the controller
  beforeEach(inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.expectGET('/api/data')
      .respond({success:true});

    createController = $injector.get('$controller');
  }));

  describe('$scope.message', function() {
    var $scope, controller;

    beforeEach(function() {
      $scope = {};
      controller = createController('MainCtrl', {$scope: $scope});
    });

    it('should set a message', function () {
      expect($scope.message).toBe('Angular Express Seed!');
    });

    it('should get a response', function () {
      $httpBackend.flush();
      expect($scope.data).toEqual({success:true});
    });
  });
});

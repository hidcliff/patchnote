'use strict'

var app = angular.module('myApp');

app.controller('MainCtrl', ['$scope', function($scope) {
  $scope.message = 'Angular Express Seed!';
}]);

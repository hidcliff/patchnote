'use strict'

var app = angular.module('myApp');

app.controller('MainCtrl', ['$scope', function($scope) {
  console.log(1);
  $scope.message = 'Angular Express Seed!';
}]);
'use strict';

angular
  .module('myApp')
  .controller('MainCtrl', MainCtrl);

function MainCtrl($scope, $http) {
  $scope.message = 'Angular Express Seed!';

  $scope.data = {};

  $http.get('/api/data').success(function(res) {
    if (res && res.success) {
      $scope.data = res;
    }
  });
}

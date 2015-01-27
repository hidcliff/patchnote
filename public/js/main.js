'use strict';

angular.module('myApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../html/main.html',
        controller: 'MainCtrl'
      });
  });

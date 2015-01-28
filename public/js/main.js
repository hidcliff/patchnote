'use strict';

angular.module('patchnoteApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: '../html/main.html',
        controller: 'MainCtrl'
      });
  });

'use strict';

var app = angular.module('patchnoteApp');

app.service('dropbox', ['$http', function($http) {
  this.service = {
    id: 'dropbox',
    title: 'Dropbox',
    linkTitle: 'Link to',  //when linked, this value is 'Unlink'
    linked: false,
    icon: 'fa-dropbox',
    linkUrl: '/link/dropbox',
    unlinkUrl: '/api/dropbox/unlink'
  };

  // check status if dropbox is linked
  $http.get('/api/dropbox/').success((function(response) {
    if (response) {
      this.service.linked = response.isLinked;
      if (response.isLinked) {
        this.service.linkTitle = 'Unlink';
      }
    }
  }).bind(this));
}]);

app.service('googleDrive', ['$http', function($http) {
  this.service = {
    id: 'googledrive',
    title: 'Google Drive',
    linkTitle: 'Link to',  //when linked, this value is 'Unlink'
    linked: false,
    icon: 'fa-google',
    linkUrl: '/link/googledrive',
    unlinkUrl: '/api/googledrive/unlink'
  };

  /*
  $http.get('/api/dropbox/').success((function(response) {
    if (response) {
      console.log(response.isLinked);
      this.service.linked = response.isLinked;
      if (response.isLinked) {
        this.service.linkTitle = 'Unlink';
      }
    }
  }).bind(this));
  */
}]);

app.factory('apiService', ['dropbox', 'googleDrive', function(dropbox, googleDrive) {
  var services = [];

  function addServices(svcs) {
    angular.forEach(svcs, function(svc, i) {
      services.push(svc.service);
    });
  }

  function getService(id) {
    var target = null;
    angular.forEach(services, function(value, i) {
      if (value.id === id) {
        target = value;
        return false;
      }
    });
    return target;
  }

  function getAll() {
    return services;
  }

  // init
  addServices(Array.prototype.slice.call(arguments));

  return {
    getService: getService,
    getAll: getAll
  };
}]);

'use strict';

angular
  .module('patchnoteApp')
  .controller('MainCtrl', MainCtrl);


function MainCtrl($scope, $http, apiStorage, apiService, placeholder, patchDialog) {
  /**
   * Constant
   */
  $scope.placeholder = placeholder;


  /**
   * For Editor
   */
  $scope.current = apiStorage.getCurrentDocument();

  $scope.parseMarkdown = function() {
    return patchmark.parse($scope.current.content);
  };

  $scope.autoSave = function() {
    apiStorage.saveDocument($scope.current);
  };


  /**
   * Features
   */
  $scope.toggleSidebar = function() {
    angular.element('.main-wrapper').toggleClass('open-sidebar');
  };

  $scope.new = function() {
    $scope.current = apiStorage.newDocument();
  };

  $scope.show = function($event) {
    angular.element($event.currentTarget).toggleClass('focus');
    angular.element('.view-pane').toggle();
    angular.element('.edit-pane').toggle();
  };


  /**
   * Services
   */
  $scope.services = apiService.getAll();

  $scope.saveTo = function(id) {
    var service = apiService.getService(id);

    if (service.linked) {
      patchDialog.toast.wait('Saving file to ' + service.title + ' ...');
      $http.post('/api/' + id + '/save', {title: $scope.current.title, content: $scope.current.content}).success(function(data, status) {
        if (status === 200) {
          patchDialog.toast.open('Successfully saved to : ' + data.path);
        }
      }).error(function(data, status, headers, config) {
        patchDialog.toast.warn(data.error);
      });
    } else {
      location.href = service.linkUrl;
    }
  };

  $scope.link = function(id) {
    var service = apiService.getService(id);
    if (!service.linked) {
      location.href = service.linkUrl;
    } else {
      $scope.unlink(id);
    }


  };

  $scope.unlink = function(id) {
    var service = apiService.getService(id);
    $http.get(service.unlinkUrl).success(function(data) {
      location.reload();
    });
  };


  /**
   * For sidebar
   */
  $scope.fileList = apiStorage.getDocumentsList();

  $scope.removeDocument = function(docId, $event) {
    $event.stopPropagation();
    if (confirm('Are you sure you want to remove the selected file?')) {
      $scope.current = apiStorage.removeDocument(docId);
      $scope.fileList = apiStorage.getDocumentsList();
      //$scope.$apply();
    }
  };

  $scope.switchDocument = function(docId) {
    if ($scope.current.id != docId) {
      $scope.current = apiStorage.switchDocument(docId);
      //$scope.$apply();
    } else {
      return false;
    }
  };
}

'use strict';

angular
  .module('patchnoteApp')
  .factory('apiStorage', apiStorage)
  .factory('patchDialog', patchDialog)
  .constant('placeholder', {
    title: 'Untitled.md',
    content: 'Typing some markdown here!'
  });


function apiStorage($templateCache) {
  var CONST_DOC = {
    TITLE: 'Untitled.md',
    CONTENT: $templateCache.get('defaultContent').replace(/^\s+/, '') || ''
  };
  var _documentsList = getStorageItem('documentsList') || [];
  var _currentDocument = initCurrentDocument(getStorageItem('currentDocument'));

  function getStorageItem(key) {
    var oData = localStorage.getItem(key);
    if (oData) {
      oData = JSON.parse(oData);
    }
    return oData;
  }

  function setStorageItem(key, oData) {
    localStorage.setItem(key, angular.toJson(oData));
  }

  function removeStorageItem(key) {
    localStorage.removeItem(key);
  }

  /*
  1. first user - just create new document
  2. new document is called - if currentDocument is exist, create new document after saving current document
  3. revisit user - get stored current document
  */
  function initCurrentDocument(doc) {
    _currentDocument && updateDocuments(); // when new document is called,

    _currentDocument = doc || {
      id: + new Date,
      title: CONST_DOC.TITLE,
      content: CONST_DOC.CONTENT
    };
    updateDocuments();

    return _currentDocument;
  }

  function saveCurrentDocument(oDoc) {
    _currentDocument = oDoc;
    setStorageItem('currentDocument', _currentDocument);
  }

  function updateDocuments() {
    var selected = getDocument(_currentDocument.id);
    if (selected.index > -1) {
      _documentsList[selected.index] = _currentDocument;
    } else {
      _documentsList.push(_currentDocument);
    }

    setStorageItem('documentsList', _documentsList);
    setStorageItem('currentDocument', _currentDocument);
  }


  function getDocument(id) {
    var index = -1, document = null;

    angular.forEach(_documentsList, function(value, i) {
      if (value.id == id) {
        document = _documentsList[i];
        index = i;
        return false
      }
    });

    return {
      index: index,
      document: document
    };
  }

  function removeDocument(id) {
    var selected = getDocument(id);
    if (selected.index > -1) {
      _documentsList.splice(selected.index, 1);
    }
    setStorageItem('documentsList', _documentsList);

    if (_currentDocument.id == id) {
      if (_documentsList.length > 0) {
        var prevDocument = _documentsList[selected.index];
        if (prevDocument) {
          _currentDocument = prevDocument;
        } else {
          _currentDocument = _documentsList[selected.index - 1];
        }
        setStorageItem('currentDocument', _currentDocument);
      } else {
        _currentDocument = null;
        _currentDocument = initCurrentDocument();
      }
    }

    return _currentDocument;
  }

  function switchCurrentDocument(id) {
    updateDocuments();
    return _currentDocument = getDocument(id).document;
  }


  return {
    getCurrentDocument: function () {
      return _currentDocument;
    },

    getDocumentsList: function () {
      return _documentsList;
    },

    newDocument: function() {
      return initCurrentDocument();
    },

    switchDocument: switchCurrentDocument,
    saveDocument: saveCurrentDocument,
    removeDocument: removeDocument
  };
}



function patchDialog($modal, $rootScope) {
  var instance = null;

  function createToastInstance(localScope) {
    var toastScope = angular.extend($rootScope.$new(), localScope);

    if (instance) {
      instance.close();
      instance = null;
    }
    return instance = $modal.open({
      templateUrl: '../html/modal.html',
      scope: toastScope
    });
  }

  function openToast(msg, type, bWait) {
    var instance = createToastInstance({
      message: msg,
      type: getType(type)
    });

    if (!bWait) {
      setTimeout(function() {
        instance.close();
      }, 2000);
    }

    return instance;
  }

  function getType(type) {
    var types = {
      'OPEN': 'fa-info-circle',
      'WARN': 'fa-exclamation-triangle',
      'WAIT': 'fa-spinner'
    };
    return types[type];
  }

  return {
    toast: {
      open: function(msg) {
        return openToast(msg, 'OPEN');
      },
      warn: function(msg) {
        return openToast(msg, 'WARN');
      },
      wait: function(msg) {
        return openToast(msg, 'WAIT', true);
      }
    }
  };
}

'use strict';

angular
  .module('patchnoteApp')
  .directive('autoSave', autoSave)
  .directive('toggleSidebar', toggleSidebar)
  .directive('patchButton', patchButton)
  .directive('toggleSidebarList', toggleSidebarList);


/**
 * AutoSave Directive - When input event invokes, save the input value.
 */
function autoSave() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      var timer = null;
      element.on('input', function() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }

        timer = setTimeout(function() {
          scope.autoSave && scope.autoSave();
        }, 1000);
      });
    }
  };
}

/**
 * Toggle Sidebar - attach touch event for mobile
 */
function toggleSidebar() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      function toggle() {
        scope.toggleSidebar();
      }

      element
        .on('click', '.toggle', toggle)
        .on('touchstart', '.protector', toggle)
        .on('click', '.protector', toggle);
    }
  };
}

/**
 * Patch Button Directive - effects when clicking
 */
function patchButton($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.on('click', function() {
        element.addClass('click');
        $timeout(function() {
          element.removeClass('click');
        }, 300, false);
      });
    }
  };
}

/**
 * Toggle sidebar list group - documents, services, links and ...
 */
function toggleSidebarList() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      function toggleClass($elem, downClass, upClass) {
        if ($elem.hasClass(downClass)) {
          $elem.removeClass(downClass);
          $elem.addClass(upClass);
        } else {
          $elem.removeClass(upClass);
          $elem.addClass(downClass);
        }
      }

      var $targetIco = element.find('.toggle-ico');
      var downClass, upClass;
      if ($targetIco) {
        downClass = $targetIco.attr('data-down-class');
        upClass = $targetIco.attr('data-up-class');
      }

      element.on('click', '.toggle-list', function(event) {
        element.find('dd').toggleClass('hide');
        toggleClass($targetIco, downClass, upClass);
      });
    }
  };
}

/*
app.directive('adsense', ['$window', function ($window) {
  return {
    restrict: 'A',
    transclude: true,
    replace: true,
    template: '<div ng-transclude></div>',
    link: function(scope, element, attr) {
      if (!$window.adsbygoogle) {
        $window.adsbygoogle = [];
      }
      $window.adsbygoogle.push({});
    }
  };
}]);
*/

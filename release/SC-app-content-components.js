'use strict';

/**
 * @ngdoc overview
 * @name SC-app-content-components
 * @description
 *
 * Provides the app with the ability to display content components content and features
 */
angular
  .module('SC-app-content-components', [
    'SC-app-utils'
  ]);;'use strict';

angular.module('SC-app-content-components')
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scHeading
   * @directive
   *
   * @description
   * Renders heading component using heading view template
   *
   */
  .directive('scHeading', ["$http", "$compile", function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/heading/headingView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scHtmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('scHtmlBlock', ["$http", "$compile", function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/htmlBlock/htmlBlockView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scImage
   * @directive
   *
   * @description
   * Renders image component using image view template
   *
   */
  .directive('scImage', ["$http", "$compile", function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/image/imageView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scLongText
   * @directive
   *
   * @description
   * Renders long text component using long text view template
   *
   */
  .directive('scLongText', ["$http", "$compile", function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/longText/longTextView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scPageElementSpec
   * @directive
   *
   * @description
   * Renders page element spec component using page element spec view template
   *
   */
  .directive('scPageElementSpec', ["$http", "$compile", function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/pageElementSpec/pageElementSpecView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }]);;'use strict';

/**
 * @ngdoc service
 * @name SC-app-content-components.factory:contentComponentFactory
 * @factory
 *
 * @description
 * Factory for loading content component data
 */

angular.module('SC-app-content-components')
  .factory('contentComponentFactory', ["$http", function($http) {

      return {

        /**
         * @ngdoc method
         * @methodOf SC-app-content-components.factory:contentComponentFactory
         * @name SC-app-content-components.factory:contentComponentFactory#getContentComponent
         * @returns {undefined} Undefined
         * @param {string} itemId The id of the paragraph item
         * @param {function} callbackSuccess The function to call when the HTTP request succeeds
         * @param {function} callbackError The function to call when the HTTP request fails
         *
         * @description
         * For getting data for a content component by paragraphs item id
         */
        getContentComponent: function(itemId, callbackSuccess, callbackError) {

          $http.get('/json/paragraphs_item.json?item_id=' + itemId)
            .success(callbackSuccess)
            .error(callbackError);
        }

      };

    }]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HeadingCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the headingView state
 */

angular.module('SC-app-content-components')
  .controller('HeadingCtrl', ["$scope", "contentComponentFactory", "utilitiesFactory", function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.heading = ('<h' + contentComponent.field_heading_level + '>' + contentComponent.field_heading + '</h' + contentComponent.field_heading_level + '>');

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HtmlBlockCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the htmlBlockView state
 */

angular.module('SC-app-content-components')
  .controller('HtmlBlockCtrl', ["$scope", "contentComponentFactory", "utilitiesFactory", function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.htmlBlock = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:ImageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the imageView state
 */

angular.module('SC-app-content-components')
  .controller('ImageCtrl', ["$scope", "contentComponentFactory", "utilitiesFactory", function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.image = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:LongTextCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the longTextView state
 */

angular.module('SC-app-content-components')
  .controller('LongTextCtrl', ["$scope", "contentComponentFactory", "utilitiesFactory", function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.longText = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:PageElementSpecCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the pageElementSpecView state
 */

angular.module('SC-app-content-components')
  .controller('PageElementSpecCtrl', ["$scope", "contentComponentFactory", "utilitiesFactory", function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.pageElementSpec = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  }]);
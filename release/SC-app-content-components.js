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
   * @name SC-app-content-components.directive:scContentComponent
   * @directive
   *
   * @description
   * Decides which content component to render
   *
   */
  .directive('scContentComponent', ["$http", "$compile", "contentComponentFactory", "utilitiesFactory", function($http, $compile, contentComponentFactory, utilitiesFactory) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          contentComponentFactory.getContentComponent(scope.id, function(contentComponent) {

            scope.contentComponent = contentComponent;

            var tpl = 'bower_components/SC-app-content-components/release/' + contentComponent.bundle + '/' + contentComponent.bundle + 'View.html';
            $http.get(tpl)
              .then(function(response) {
                element.html($compile(response.data)(scope));
              });

          }, utilitiesFactory.genericHTTPCallbackError);

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
            .success(function(response) {
              callbackSuccess(response.list[0]);
            })
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
  .controller('HeadingCtrl', ["$scope", function($scope) {

    $scope.heading = ('<h' + $scope.contentComponent.field_heading_level + '>' + $scope.contentComponent.field_heading + '</h' + $scope.contentComponent.field_heading_level + '>');

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
  .controller('HtmlBlockCtrl', ["$scope", function($scope) {

      $scope.htmlBlock = $scope.contentComponent;

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
  .controller('ImageCtrl', ["$scope", function($scope) {

    $scope.image = $scope.contentComponent;

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
  .controller('LongTextCtrl', ["$scope", function($scope) {

    $scope.longText = $scope.contentComponent;

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
  .controller('PageElementSpecCtrl', ["$scope", function($scope) {

      $scope.pageElementSpec = $scope.contentComponent;

  }]);
'use strict';

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
  .directive('scHeading', function($http, $compile) {
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
  })
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scHtmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('scHtmlBlock', function($http, $compile) {
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
  })
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scImage
   * @directive
   *
   * @description
   * Renders image component using image view template
   *
   */
  .directive('scImage', function($http, $compile) {
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
  })
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scLongText
   * @directive
   *
   * @description
   * Renders long text component using long text view template
   *
   */
  .directive('scLongText', function($http, $compile) {
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
  })
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scPageElementSpec
   * @directive
   *
   * @description
   * Renders page element spec component using page element spec view template
   *
   */
  .directive('scPageElementSpec', function($http, $compile) {
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
  });
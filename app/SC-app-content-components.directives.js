'use strict';

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
  .directive('scContentComponent', function($http, $compile, contentComponentFactory, utilitiesFactory, $templateCache) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          contentComponentFactory.getContentComponent(scope.component.id, function(contentComponent) {

            scope.contentComponent = contentComponent;

            var tpl = 'bower_components/SC-app-content-components/release/' + contentComponent.bundle + '/' + contentComponent.bundle + 'View.html';
            var tplFromCache = $templateCache.get(tpl);

            if (typeof tplFromCache === 'undefined') {

              $http.get(tpl)
                .then(function(response) {
                  $templateCache.put('bower_components/SC-app-content-components/release/html/htmlView.html', response.data);
                  element.html($compile(response.data)(scope));
                });

            } else {

              element.html($compile(tplFromCache)(scope));

            }

          }, utilitiesFactory.genericHTTPCallbackError);

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name SC-app-content-components-heading-menu.directive:scContentComponentHeadingMenu
   * @directive
   *
   * @description
   * Display content component H2 headings as a menu
   *
   */
  .directive('scContentComponentHeadingMenu', function($http, $compile, contentComponentFactory, utilitiesFactory) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          contentComponentFactory.getContentComponent(scope.component.id, function(contentComponent) {

            scope.contentComponent = contentComponent;

            if (contentComponent.field_heading_level === '2') {
              var tpl = 'bower_components/SC-app-content-components/release/heading/headingMenuView.html';
              $http.get(tpl)
                .then(function(response) {
                  element.html($compile(response.data)(scope));
                });
            }

          }, utilitiesFactory.genericHTTPCallbackError);

        };
      }
    };
  });
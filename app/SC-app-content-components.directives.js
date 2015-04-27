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
  .directive('scContentComponent', function($http, $compile, contentComponentFactory, utilitiesFactory) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          contentComponentFactory.getContentComponent(scope.component.id, function(contentComponent) {

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
  });
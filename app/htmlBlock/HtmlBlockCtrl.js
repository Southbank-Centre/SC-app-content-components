'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HtmlBlockCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the htmlBlockView state
 */

angular.module('SC-app-content-components')
  .controller('HtmlBlockCtrl', function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.htmlBlock = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  });
'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:PageElementSpecCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the pageElementSpecView state
 */

angular.module('SC-app-content-components')
  .controller('PageElementSpecCtrl', function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.pageElementSpec = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  });
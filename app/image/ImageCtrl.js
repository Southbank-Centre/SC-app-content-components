'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:ImageCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the imageView state
 */

angular.module('SC-app-content-components')
  .controller('ImageCtrl', function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.image = contentComponent;

    }, utilitiesFactory.genericHTTPCallbackError);

  });
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
  .controller('HtmlBlockCtrl', function($scope) {

      $scope.htmlBlock = $scope.contentComponent;

  });
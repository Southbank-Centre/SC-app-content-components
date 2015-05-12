'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HtmlCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the htmlView state
 */

angular.module('SC-app-content-components')
  .controller('HtmlCtrl', function($scope) {

      $scope.html = $scope.contentComponent;

  });
'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:LongTextCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the longTextView state
 */

angular.module('SC-app-content-components')
  .controller('LongTextCtrl', function($scope) {

    $scope.longText = $scope.contentComponent;

  });
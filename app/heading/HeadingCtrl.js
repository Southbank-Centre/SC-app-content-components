'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HeadingCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the headingView state
 */

angular.module('SC-app-content-components')
  .controller('HeadingCtrl', function($scope) {

    $scope.heading = ('<h' + $scope.contentComponent.field_heading_level + '>' + $scope.contentComponent.field_heading + '</h' + $scope.contentComponent.field_heading_level + '>');

  });
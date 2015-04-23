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
  .controller('HeadingCtrl', function($scope, contentComponentFactory, utilitiesFactory) {

    contentComponentFactory.getContentComponent($scope.id, function(contentComponent) {

      $scope.heading = ('<h' + contentComponent.field_heading_level + '>' + contentComponent.field_heading + '</h' + contentComponent.field_heading_level + '>');

    }, utilitiesFactory.genericHTTPCallbackError);

  });
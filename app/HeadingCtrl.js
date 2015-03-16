'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HeadingCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the HeadingView state
 */

angular.module('SC-app-content-components')
  .controller('HeadingCtrl', function($scope) {

    if ($scope.paragraph.bundle === 'subheading') {

      $scope.paragraph.field_subheading  = ('<h' + $scope.paragraph.field_subheading_level + '>' + $scope.paragraph.field_subheading + '</h' + $scope.paragraph.field_subheading_level + '>');

    }

  });
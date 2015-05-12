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
  .controller('ImageCtrl', function($scope, $http) {

    // if we have a file id in the image field, get the URL of the file
    if ($scope.contentComponent.field_image.file.id) {
      $http.get('/json/file/' + $scope.contentComponent.field_image.file.id + '.json')
        .success(function(file) {
          $scope.contentComponent.field_image.file.url = file.url;
        });
    }

    $scope.image = $scope.contentComponent;

  });
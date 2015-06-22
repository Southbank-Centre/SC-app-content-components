'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:FileUploadCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the fileUploadView state
 */

angular.module('SC-app-content-components')
  .controller('FileUploadCtrl', function($scope, $http) {

    angular.forEach($scope.contentComponent.field_file_upload, function(item) {

      $http.get('/json/file/' + item.file.id + '.json')
        .success(function(file) {
          item.file.url = file.url;
          item.file.name = file.name;
          item.file.size = parseInt(file.size);
        });

    });

    $scope.fileUpload = $scope.contentComponent;

  });
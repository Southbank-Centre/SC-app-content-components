'use strict';

/**
 * @ngdoc service
 * @name SC-app-content-components.factory:contentComponentFactory
 * @factory
 *
 * @description
 * Factory for loading content component data
 */

angular.module('SC-app-content-components')
  .factory('contentComponentFactory', function($http) {

      return {

        /**
         * @ngdoc method
         * @methodOf SC-app-content-components.factory:contentComponentFactory
         * @name SC-app-content-components.factory:contentComponentFactory#getContentComponent
         * @returns {undefined} Undefined
         * @param {string} itemId The id of the paragraph item
         * @param {function} callbackSuccess The function to call when the HTTP request succeeds
         * @param {function} callbackError The function to call when the HTTP request fails
         *
         * @description
         * For getting data for a content component by paragraphs item id
         */
        getContentComponent: function(itemId, callbackSuccess, callbackError) {

          $http.get('/json/paragraphs_item.json?item_id=' + itemId)
            .success(function(response) {
              callbackSuccess(response.list[0]);
            })
            .error(callbackError);
        }

      };

    });
'use strict';

angular.module('SC-app-content-components')
  /**
   * @ngdoc directive
   * @name wowApp.directive:eventList
   * @directive
   *
   * @description
   * Renders event list component using it's relevant template
   *
   */
  .directive('eventList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/featuredEventsView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:personList
   * @directive
   *
   * @description
   * Renders person list component using it's relevant template
   *
   */
  .directive('personList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/featuredPersonsView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:pageList
   * @directive
   *
   * @description
   * Renders content page list component using it's relevant template
   *
   */
  .directive('pageList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/featuredPagesView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:youtubePromo
   * @directive
   *
   * @description
   * Renders youtube embed component using youtube promo view template
   *
   */
  .directive('youtubePromo', function($http, $compile, $window) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/youtubePromoView.html';
          $http.get(tpl)
            .then(function(response) {
                
              // Add &enablejsapi=1 to youtube url
              // Use same protocol for youtube embed as page
              var iframe = angular.element(scope.component.field_youtube_embed_code.value);
              var url = iframe.attr('src');
              url = (url.indexOf('&') > -1 ? url + '&' : url + '?');
              url = url + 'enablejsapi=1';
              url = url.replace(/http:/g, '');
              url = url.replace(/https:/g, '');
              iframe.attr('src', url);
              scope.component.field_youtube_embed_code.value = iframe[0].outerHTML;
              

              element.html($compile(response.data)(scope));


              // If not mobile device
              if(typeof $window.orientation === 'undefined') {
                
                var waitForYouTubeIframeAPI = function() {

                  setTimeout(function() {

                    // If the YouTube Iframe API is ready, wait again
                    if (!$window.youTubeIframeAPIReady) {

                      waitForYouTubeIframeAPI();

                    } else {

                      var player;

                      player = new $window.YT.Player(element.find('iframe')[0], {
                        events: {
                          onReady: function() {
                            // Attach playVideo to scope, which is used on
                            // big play button
                            scope.playVideo = function() {
                              player.playVideo();
                              element.find('#play-button').remove();
                            };
                          },
                          onStateChange: function(state) {
                            if (state.data === 1) {
                              element.find('#play-button').remove();
                            }
                          }
                        }
                      });

                    }
                    
                  }, 200);

                };

                waitForYouTubeIframeAPI();


                } else {
                // remove play button if mobile
                element.find('#play-button').remove();
              }
               

            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:linkList
   * @directive
   *
   * @description
   * Renders link list component using link list view template
   *
   */
  .directive('linkList', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/linkListView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:htmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('htmlBlock', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/htmlBlockView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  })
  /**
   * @ngdoc directive
   * @name wowApp.directive:twitterFeed
   * @directive
   *
   * @description
   * Renders twitter feed component using it's relevant template
   *
   */
  .directive('twitterFeed', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/twitterFeedView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  });
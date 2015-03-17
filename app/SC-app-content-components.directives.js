'use strict';

angular.module('SC-app-content-components')
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scEventList
   * @directive
   *
   * @description
   * Renders event list component using it's relevant template
   *
   */
  .directive('scEventList', function($http, $compile) {
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
   * @name SC-app-content-components.directive:scPersonList
   * @directive
   *
   * @description
   * Renders person list component using it's relevant template
   *
   */
  .directive('scPersonList', function($http, $compile) {
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
   * @name SC-app-content-components.directive:scPageList
   * @directive
   *
   * @description
   * Renders content page list component using it's relevant template
   *
   */
  .directive('scPageList', function($http, $compile) {
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
   * @name SC-app-content-components.directive:scYoutubePromo
   * @directive
   *
   * @description
   * Renders youtube embed component using youtube promo view template
   *
   */
  .directive('scYoutubePromo', function($http, $compile, $window) {
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
              url = (url.indexOf('?') > -1 ? url + '&' : url + '?');
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
   * @name SC-app-content-components.directive:scLinkList
   * @directive
   *
   * @description
   * Renders link list component using link list view template
   *
   */
  .directive('scLinkList', function($http, $compile) {
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
   * @name SC-app-content-components.directive:scHtmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('scHtmlBlock', function($http, $compile) {
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
   * @name SC-app-content-components.directive:scTwitterFeed
   * @directive
   *
   * @description
   * Renders twitter feed component using it's relevant template
   *
   */
  .directive('scTwitterFeed', function($http, $compile) {
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
  })
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scHeading
   * @directive
   *
   * @description
   * Renders heading component using it's relevant template
   *
   */
  .directive('scHeading', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/headingView.html';
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
   * @name SC-app-content-components.directive:scLongText
   * @directive
   *
   * @description
   * Renders long text component using it's relevant template
   *
   */
  .directive('scLongText', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/longTextView.html';
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
   * @name SC-app-content-components.directive:scSoundcloud
   * @directive
   *
   * @description
   * Renders soundcloud component using it's relevant template
   *
   */
  .directive('scSoundcloud', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/soundcloudView.html';
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
   * @name SC-app-content-components.directive:scYoutube
   * @directive
   *
   * @description
   * Renders youtube component using it's relevant template
   *
   */
  .directive('scYoutube', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/youtubeView.html';
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
   * @name SC-app-content-components.directive:scFlickr
   * @directive
   *
   * @description
   * Renders flickr component using it's relevant template
   *
   */
  .directive('scFlickr', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/flickrView.html';
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
   * @name SC-app-content-components.directive:scPullQuote
   * @directive
   *
   * @description
   * Renders pull quote component using it's relevant template
   *
   */
  .directive('scPullQuote', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/pullQuoteView.html';
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
   * @name SC-app-content-components.directive:scLink
   * @directive
   *
   * @description
   * Renders link component using it's relevant template
   *
   */
  .directive('scLink', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/linkView.html';
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
   * @name SC-app-content-components.directive:scImage
   * @directive
   *
   * @description
   * Renders link component using it's relevant template
   *
   */
  .directive('scImage', function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/imageView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  });
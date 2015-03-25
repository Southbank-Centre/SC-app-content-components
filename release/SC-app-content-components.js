'use strict';

/**
 * @ngdoc overview
 * @name SC-app-content-components
 * @description
 *
 * Provides the app with the ability to display content components content and features
 */
angular
  .module('SC-app-content-components', []);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:HeadingCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the HeadingView state
 */

angular.module('SC-app-content-components')
  .controller('HeadingCtrl', ["$scope", function($scope) {

    if ($scope.paragraph.bundle === 'subheading') {

      $scope.paragraph.field_subheading  = ('<h' + $scope.paragraph.field_subheading_level + '>' + $scope.paragraph.field_subheading + '</h' + $scope.paragraph.field_subheading_level + '>');

    }

  }]);;'use strict';

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
  .directive('scEventList', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scPersonList
   * @directive
   *
   * @description
   * Renders person list component using it's relevant template
   *
   */
  .directive('scPersonList', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scPageList
   * @directive
   *
   * @description
   * Renders content page list component using it's relevant template
   *
   */
  .directive('scPageList', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scBlogPostList
   * @directive
   *
   * @description
   * Renders content blog post list component using the relevant template
   *
   */
  .directive('scBlogPostList', ["$http", "$compile", "utilitiesFactory", function($http, $compile, utilitiesFactory) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/featuredBlogPostView.html';
          $http.get(tpl)
            .then(function(response) {

              // Cache the posts which have been publised to overwrite the main posts array - remove unpublished posts
              var publishedPosts = [];

              angular.forEach(scope.component.field_list_blog_post.field_blog_post_list, function(post) {
                // Set the published dates to use seconds rather than milliseconds so that the date formatting works correctly
                if (post.field_published_date) {
                  post.field_published_date = utilitiesFactory.timestampSecondsToMS(post.field_published_date);
                }

                // If the post is not published the status will be 0, 1 otherwise
                if(parseInt(post.status, 10) > 0) {
                  publishedPosts.push(post);
                }
              });

              // Assign only the published blog posts back into the scope data for rendering
              scope.component.field_list_blog_post.field_blog_post_list = publishedPosts;

              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scYoutubePromo
   * @directive
   *
   * @description
   * Renders youtube embed component using youtube promo view template
   *
   */
  .directive('scYoutubePromo', ["$http", "$compile", "$window", function($http, $compile, $window) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          // YouTube iFrame API
          // If not mobile device
          if(typeof $window.orientation === 'undefined') {
            var tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            $window.onYouTubeIframeAPIReady = function() {
              window.youTubeIframeAPIReady = true;
            };
          }

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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scLinkList
   * @directive
   *
   * @description
   * Renders link list component using link list view template
   *
   */
  .directive('scLinkList', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scHtmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('scHtmlBlock', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scTwitterFeed
   * @directive
   *
   * @description
   * Renders twitter feed component using it's relevant template
   *
   */
  .directive('scTwitterFeed', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scHeading
   * @directive
   *
   * @description
   * Renders heading component using it's relevant template
   *
   */
  .directive('scHeading', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scLongText
   * @directive
   *
   * @description
   * Renders long text component using it's relevant template
   *
   */
  .directive('scLongText', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scSoundcloud
   * @directive
   *
   * @description
   * Renders soundcloud component using it's relevant template
   *
   */
  .directive('scSoundcloud', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scYoutube
   * @directive
   *
   * @description
   * Renders youtube component using it's relevant template
   *
   */
  .directive('scYoutube', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scFlickr
   * @directive
   *
   * @description
   * Renders flickr component using it's relevant template
   *
   */
  .directive('scFlickr', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scPullQuote
   * @directive
   *
   * @description
   * Renders pull quote component using it's relevant template
   *
   */
  .directive('scPullQuote', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scLink
   * @directive
   *
   * @description
   * Renders link component using it's relevant template
   *
   */
  .directive('scLink', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scImage
   * @directive
   *
   * @description
   * Renders link component using it's relevant template
   *
   */
  .directive('scImage', ["$http", "$compile", function($http, $compile) {
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
  }])
  /**
   * @ngdoc directive
   * @name SC-app-content-components.directive:scStorify
   * @directive
   *
   * @description
   * Renders storify component using it's relevant template
   *
   */
  .directive('scStorify', ["$http", "$compile", function($http, $compile) {
    return {
      restrict: 'A',
      scope: true,
      compile: function() {

        return function(scope, element) {

          var tpl = 'bower_components/SC-app-content-components/release/storifyView.html';
          $http.get(tpl)
            .then(function(response) {
              element.html($compile(response.data)(scope));
            });

        };
      }
    };
  }]);;'use strict';

/**
 * @ngdoc controller
 * @name SC-app-content-components.controller:TwitterFeedCtrl
 * @controller
 *
 * @description
 * Defines the state and behaviour of the $scope for the twitterFeed state
 */

angular.module('SC-app-content-components')
  .controller('TwitterFeedCtrl', ["$scope", "$http", "$window", "appConfig", function($scope, $http, $window, appConfig) {

    // This block is tied to festivals because it uses the twitter
    // username stored on festival
    if (appConfig.festivalId) {

      // Load the tweets from the API
      $http.get('/json/favourited-tweets/' + appConfig.festivalId)
        .success(function(data) {

          if (!data.errors) {

            $scope.twitterValid = true;
          
            $scope.tweets = data;

            angular.forEach($scope.tweets, function(tweet, i) {

              // Format creation date/time with moment twitter format
              $scope.tweets[i].created_at = $window.moment(tweet.created_at).fromNow();

              // Begin formatting of entities
              var entities = {};

              // Hashtags
              angular.forEach(tweet.entities.hashtags, function(hashtag) {
                entities[hashtag.indices[0]] = '<a href="https://twitter.com/hashtag/' + hashtag.text + '">';
                entities[hashtag.indices[1]] = '</a>';
              });

              // Media
              angular.forEach(tweet.entities.media, function(media) {
                entities[media.indices[0]] = '<a href="' + media.media_url + '">';
                entities[media.indices[1]] = '</a>';
              });

              // URLs
              angular.forEach(tweet.entities.urls, function(url) {
                entities[url.indices[0]] = '<a href="' + url.url + '">';
                entities[url.indices[1]] = '</a>';
              });

              // User mentions
              angular.forEach(tweet.entities.user_mentions, function(user_mention) {
                entities[user_mention.indices[0]] = '<a href="http://twitter.com/' + user_mention.screen_name + '">';
                entities[user_mention.indices[1]] = '</a>';
              });

              // Apply entity markup
              var delta = 0;
              angular.forEach(entities, function(entity, pos) {

                var n = parseInt(pos, 10) + delta;
                $scope.tweets[i].text = $scope.tweets[i].text.substr(0, n) + entity + $scope.tweets[i].text.substr(n);
                delta = delta + entity.length;

              });

            });

          }


        });

    } else {

      console.error('Twitter feed component requires festival module');

    }

  }]);
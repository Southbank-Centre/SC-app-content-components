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
   * @name wowApp.directive:eventList
   * @directive
   *
   * @description
   * Renders event list component using it's relevant template
   *
   */
  .directive('eventList', ["$http", "$compile", function($http, $compile) {
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
   * @name wowApp.directive:personList
   * @directive
   *
   * @description
   * Renders person list component using it's relevant template
   *
   */
  .directive('personList', ["$http", "$compile", function($http, $compile) {
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
   * @name wowApp.directive:pageList
   * @directive
   *
   * @description
   * Renders content page list component using it's relevant template
   *
   */
  .directive('pageList', ["$http", "$compile", function($http, $compile) {
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
   * @name wowApp.directive:youtubePromo
   * @directive
   *
   * @description
   * Renders youtube embed component using youtube promo view template
   *
   */
  .directive('youtubePromo', ["$http", "$compile", "$window", function($http, $compile, $window) {
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
  }])
  /**
   * @ngdoc directive
   * @name wowApp.directive:linkList
   * @directive
   *
   * @description
   * Renders link list component using link list view template
   *
   */
  .directive('linkList', ["$http", "$compile", function($http, $compile) {
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
   * @name wowApp.directive:htmlBlock
   * @directive
   *
   * @description
   * Renders HTML block component using HTML block view template
   *
   */
  .directive('htmlBlock', ["$http", "$compile", function($http, $compile) {
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
   * @name wowApp.directive:twitterFeed
   * @directive
   *
   * @description
   * Renders twitter feed component using it's relevant template
   *
   */
  .directive('twitterFeed', ["$http", "$compile", function($http, $compile) {
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
  .controller('TwitterFeedCtrl', ["$scope", "$rootScope", "$http", "$window", function($scope, $rootScope, $http, $window) {

    // Load the tweets from the API
    $http.get('/json/favourited-tweets/' + $rootScope.festivalId)
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

  }]);
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
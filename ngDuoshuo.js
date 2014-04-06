(function(){
	var ngDuoshuo = angular.module("ngDuoshuo", []);

 	ngDuoshuo.provider("$duoshuo", function(){
 		
 		this.setShortName = function(shortName){
 			window.duoshuoQuery = { short_name: shortName };
 		};

 		this.setSSO = function(login, logout){
 			window.duoshuoQuery.sso = {
 				login: login,
 				logout: logout
 			};
 			window.ssoSet = true;

 		};

 		this.$get = ["$window", "$timeout", function($window, $timeout){
 			
 			var checkShortName = function(){
 				if(!$window.duoshuoQuery){
 					throw new Error("please set the short_name in your config");
 				} else if(!$window.duoshuoQuery.short_name) {
 					throw new Error("please set the short_name in your config");
 				}
 			}

	 		var loadScript = function(callback){
				var ds = document.createElement("script");
				ds.type = "text/javascript";
				ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + 
					'//static.duoshuo.com/embed.js';
				ds.charset = "UTF-8";
				(document.getElementsByTagName('head')[0] 
	 				|| document.getElementsByTagName('body')[0]).appendChild(ds);
				ds.onload = callback;
			};

			var prepareComment = function(scope){
				checkShortName();

				var el = document.createElement("div");

				if(!scope.threadKey) {
					throw new Error("thread-key is not defined");
				}
				el.setAttribute("data-thread-key", scope.threadKey);

				if(scope.url) {
					el.setAttribute("data-url", scope.url);
				} else {
					scope.url = $window.location.href;
					console.log("如果使用ajax，最好设置url");
				}
				if(scope.title) {
					el.setAttribute("data-title", scope.title);
				}
				if(scope.image) {
					el.setAttribute("data-image", scope.image);
				}
				if(scope.authorKey) {
					el.setAttribute("data-author-key", scope.authorKey);
				}
				if(scope.fromPosition) {
					el.setAttribute("data-from-postion", scope.fromPosition);
				}
				if(scope.limit){
					el.setAttribute("data-limit", scope.limit);
				}
				if(scope.order){
					el.setAttribute("data-order", scope.order);
				}

				return el;
			};

			var loadRecentComments = function(scope, Elm){
				checkShortName();

				var el = document.createElement("div");
				if(scope.numItems){
					el.setAttribute("data-num-items", scope.numItems);
				}
				if(scope.showAvatars){
					el.setAttribute("data-show-avatars", scope.showAvatars);
				}
				if(scope.showTime){
					el.setAttribute("data-show-time", scope.showTime);
				}
				if(scope.showTitle){
					el.setAttribute("data-show-title", scope.showTitle);
				}
				if(scope.showAdmin){
					el.setAttribute("data-show-Admin", scope.showAdmin);
				}
				if(scope.excerptLength){
					el.setAttribute("data-excerpt-lenght", scope.excerptLength);
				}
				if(!$window.DUOSHUO){
					// 如果不用$timeout函数，会出现 Uncaught Syntax error, unrecognized expression: [object HTMLDivElement] 错误
					// 原因是多说在加载完embed.js之后,还要加载jQuery.js。
	 				// 当直接调用 EmbedThread()函数时，由于jQuery.js还没加载完成。所以导致出错。
					loadScript($timeout(function(){
						$window.DUOSHUO.RecentComments(el);
						Elm.html("");
						Elm.append(el);
					}, 1000));
				}
				else {
					$window.DUOSHUO.RecentComments(el);
					Elm.html("");
					Elm.append(el);
				}
			}

			var loadRecentVisitors = function(scope, Elm){
				checkShortName();

				var el = document.createElement("div");
				if(scope.numItems) {
					el.setAttribute("data-num-items", scope.numItems);
				}
				if(!$window.DUOSHUO){
					// 如果不用$timeout函数，会出现 Uncaught Syntax error, unrecognized expression: [object HTMLDivElement] 错误
					// 原因是多说在加载完embed.js之后,还要加载jQuery.js。
	 				// 当直接调用 EmbedThread()函数时，由于jQuery.js还没加载完成。所以导致出错。
					loadScript($timeout(function(){
						$window.DUOSHUO.RecentVisitors(el);
						Elm.html("");
						Elm.append(el);
					}, 1000));
				}
				else {
					$window.DUOSHUO.RecentVisitors(el);
					Elm.html("");
					Elm.append(el);
				}
			};

			//热评文章
			var loadTopThreads = function(scope, Elm) {
				checkShortName();

				var el = document.createElement("div");
				if(scope.range) {
					el.setAttribute("data-range", scope.range);
				}
				if(scope.numItems) {
					el.setAttribute("data-num-items", scope.numItems);
				}
				if(!$window.DUOSHUO){
					// 如果不用$timeout函数，会出现 Uncaught Syntax error, unrecognized expression: [object HTMLDivElement] 错误
					// 原因是多说在加载完embed.js之后,还要加载jQuery.js。
	 				// 当直接调用 EmbedThread()函数时，由于jQuery.js还没加载完成。所以导致出错。
					loadScript($timeout(function(){
						$window.DUOSHUO.TopThreads(el);
						Elm.html("");
						Elm.append(el);
					}, 1000));
				}
				else {
					$window.DUOSHUO.TopThreads(el);
					Elm.html("");
					Elm.append(el);
				}
			};

			//文章评论统计
			var loadThreadCount = function(scope, Elm){
				checkShortName();
				var el = document.createElement("div");
				if(!scope.threadKey) {
					throw new Error("thread-key is not defined");
				}
				el.setAttribute("data-thread-key", scope.threadKey);
				if(scope.countType) {
					el.setAttribute("data-count-type", scope.countType);
				}
				if(!$window.DUOSHUO){
					// 如果不用$timeout函数，会出现 Uncaught Syntax error, unrecognized expression: [object HTMLDivElement] 错误
					// 原因是多说在加载完embed.js之后,还要加载jQuery.js。
	 				// 当直接调用 EmbedThread()函数时，由于jQuery.js还没加载完成。所以导致出错。
					loadScript($timeout(function(){
						$window.DUOSHUO.ThreadCount(el);
						Elm.html("");
						Elm.append(el);
					}, 1000));
				}
				else {
					$window.DUOSHUO.ThreadCount(el);
					Elm.html("");
					Elm.append(el);
				}

			}

			//加载评论
 			var loadComment = function(scope, Elm){
				// 设置多说登陆跳转。
				if(!$window.duoshuoQuery.set){
					$window.duoshuoQuery.sso = {
						login: $window.location.href,
						logout: $window.location.href
					}
				}
				
				var el = prepareComment(scope);
				
				if(!$window.DUOSHUO){
					// 如果不用$timeout函数，会出现 Uncaught Syntax error, unrecognized expression: [object HTMLDivElement] 错误
					// 原因是多说在加载完embed.js之后,还要加载jQuery.js。
	 				// 当直接调用 EmbedThread()函数时，由于jQuery.js还没加载完成。所以导致出错。
					loadScript($timeout(function(){
						$window.DUOSHUO.EmbedThread(el);
						Elm.html("");
						Elm.append(el);
					}, 1000));
				}
				else {
					$window.DUOSHUO.EmbedThread(el);
					Elm.html("");
					Elm.append(el);
				}
			};
 			return {
 				loadComment: loadComment,
 				loadRecentComments: loadRecentComments,
 				loadRecentVisitors: loadRecentVisitors,
 				loadTopThreads: loadTopThreads,
 				loadThreadCount: loadThreadCount
 			};
 		}];	
 	});

	ngDuoshuo.directive('duoshuo', ['$window', '$duoshuo', function($window, $duoshuo){

		return {
			restrict: 'EA',
			scope: {
				shortName: '@',
				threadKey: '@',
				url: '@',
				title: '@',
				image: '@',
				authorKey: '@',
				limit: '@',
				order: '@'
			},
			link: function(scope, iElm, iAttrs, controller) {				
				scope.$watch('threadKey', function(){
					$duoshuo.loadComment(scope, iElm);
				})	
			}
		};
	}]);
	ngDuoshuo.directive("dsRecentComments", ["$duoshuo", function($duoshuo){
		return {
			restrict: 'EA',
			scope: {
				numItems: '@',
				showAvatars: '@',
				showTime: '@',
				showTitle: '@',
				showAdmin: '@',
				excerptLength: '@'
			},
			link: function(scope, iElm){
				$duoshuo.loadRecentComments(scope, iElm);
			}
		}
	}])
	ngDuoshuo.directive("dsRecentVisitors", ["$duoshuo", function($duoshuo){
		return {
			restrict: 'EA',
			scope: {
				numItems:'@'
			},
			link: function(scope, iElm){
					$duoshuo.loadRecentVisitors(scope, iElm);
			}
		}
	}])
	ngDuoshuo.directive("dsTopThreads", ["$duoshuo", function($duoshuo){
		return {
			restrict: "EA",
			scope: {
				range: "@",
				numItems: "@"
			},
			link:function(scope, iElm){
				$duoshuo.loadTopThreads(scope, iElm);
			}
		}
	}])
	ngDuoshuo.directive("dsThreadCount", ["$duoshuo", function($duoshuo){
		return {
			restrict: "EA",
			scope: {
				threadKey: "@",
				countType: "@"
			},
			link: function(scope, iElm) {
				$duoshuo.loadThreadCount(scope, iElm);
			}
		}
	}]);
})(angular, window);


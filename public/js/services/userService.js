angular.module('taskApp')
	.factory('User', User);

User.$inject = ['$q', '$rootScope', '$log', 'appStorage', 'Auth'];

function User($q, $rootScope, $log, appStorage, Auth) {

	var user = undefined;

	var service = {
		// async way how to load user from Server API
		getAuthObject: function () {
			var deferred = $q.defer();
			Auth.me()
				.success(function (data) {
					$log.log("[userService]: user/me is here");
					user = {
						data: data.user,
						isAuthenticated: true
					};
					name = data.user.name;
					$log.log(user);
					$log.log(data.user);
					$log.info("[userService]: user is ready");
					appStorage.setData('user', name);
					$rootScope.$broadcast('user:me',user);
					deferred.resolve(user);
				});
			// later we can use this quick way -
			// - once user is already loaded
			if (user) {
				$log.info("[userService]: user is ready");
				appStorage.setData('user', name);
				$rootScope.$broadcast('user:me',user);
				return $q.when(user);
			}
			return deferred.promise;
		},

		// sync, quick way how to check IS authenticated...
		isAuthenticated: function () {
			$log.log("[userService]: check if user is auth");
			return user !== undefined && user.isAuthenticated;
		}
	};
	return service;
}

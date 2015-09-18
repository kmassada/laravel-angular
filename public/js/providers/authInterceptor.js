angular.module('taskApp')

.factory('authInterceptor', function ($rootScope, $q, $window) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
                // console.log(config);
			if ($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}
			return config;
		},
		responseError: function (rejection) {
			if (rejection.status === 401) {
				// handle the case where the user is not authenticated
			}
			return $q.reject(rejection);
		}
	};
});

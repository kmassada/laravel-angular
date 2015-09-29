angular.module('taskApp')

.factory('authInterceptor', function ($rootScope, $q, $window, Alert) {
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
			if (rejection.status === 401 || rejection.status === 403 || rejection.status === 400) {
				 Alert.showAlert('danger', 'Hmmm....', 'you need to be logged in to view this page!');
				 window.location = "/#/login";
			}
			return $q.reject(rejection);
		}
	};
});

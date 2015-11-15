angular.module('taskApp')
	.factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ['$q', '$window', '$log', '$injector', 'Alert', 'appStorage'];

function authInterceptor($q, $window, $log, $injector, Alert, appStorage) {
	var service = {
		request: function (config) {
			config.headers = config.headers || {};
			var token = appStorage.getData('token');
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		},
		responseError: function (rejection) {
			if (rejection.status === 401 || rejection.status === 403 || rejection.status === 400) {
				Alert.showAlert('danger', 'Hmmm....', 'you need to be logged in to view this page!');
				$window.localStorage.removeItem('token');
				delete $window.localStorage;
			}
			return $q.reject(rejection);
		}
	};
	return service;
}

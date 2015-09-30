angular.module('taskApp')

.factory('authInterceptor', function ($rootScope, $q, $window, Alert, tokenStorage) {
	return {
		request: function (config) {
			config.headers = config.headers || {};
            var token=tokenStorage.getData();
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
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

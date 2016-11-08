angular.module('taskApp')
.factory('Auth', Auth);

Auth.$inject = ['$http', '$q', '$log', '$window', 'appStorage', 'url', '$timeout'];

function Auth($http, $q, $log, $window, appStorage, url, $timeout) {

	var service = {
		register: function (data, success, error) {
			$http.post(url.BASE_API + '/api/register', data)
				.success(success)
				.error(function (error) {
					// Erase the token if the user fails to log in
					$window.localStorage.removeItem('token');
				  });
		},
		signin: function (data) {
			var deferred = $q.defer();
			$log.log("[authService]: attempt login");
			$http.post(url.BASE_API + '/api/signin', data)
				.success(function(data, status, headers, config) {
					$log.info("[authService]: success on api side");
					$log.log(data);
					$log.log("[authService]: setting token");
					appStorage.setData('token',data.token);
					deferred.resolve(data);
				})
				.error(function (error) {
					// Erase the token if the user fails to log in
					$window.localStorage.removeItem('token');
					deferred.reject();
				  });
			return deferred.promise;
		},
		me: function () {
			return $http.get(url.BASE_API + '/api/user/me');
		},
		logout: function () {
			$window.localStorage.removeItem('token');
			var deferred = $q.defer();
			$http.post(url.BASE_API + '/api/logout')
				.then(function(data, status, headers, config) {
					deferred.resolve();
				},function (error) {
					// Erase the token if the user fails to log in
					$window.localStorage.removeItem('token');
					delete $window.localStorage;
					tokenClaims = {};
					deferred.reject();
				  });
			return deferred.promise;
		},
		getTokenClaims: function () {
			return tokenClaims;
		}
	};

	return service;

	function urlBase64Decode(str) {
		var output = str.replace('-', '+')
			.replace('_', '/');
		switch (output.length % 4) {
		case 0:
			break;
		case 2:
			output += '==';
			break;
		case 3:
			output += '=';
			break;
		default:
			throw 'Illegal base64url string!';
		}
		return window.atob(output);
	}


	function getClaimsFromToken() {
		var deferred = $q.defer();
		var token = $window.localStorage.token;
		var user = {};
		if (typeof token !== 'undefined') {
			var encoded = token.split('.')[1];
			user = JSON.parse(urlBase64Decode(encoded));
			$log.log("[authService]: token claims");
			$log.log(user);
			deferred.resolve(user);
		}else {
			deferred.reject();
		}
		return deferred.promise;
	}

	var tokenClaims = getClaimsFromToken();

}

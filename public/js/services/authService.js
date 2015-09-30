angular.module('taskApp')
.factory('Auth', Auth);

Auth.$inject = ['$http', '$q', '$window', 'url', '$timeout'];

function Auth($http, $q, $window, url, $timeout) {

	var service = {
		register: function (data, success, error) {
			$http.post(url.BASE_API + '/api/register', data)
				.success(success)
				.error(function (error) {
					// Erase the token if the user fails to log in
					delete $window.localStorage.token;
				  });
		},
		signin: function (data) {
			var deferred = $q.defer();
			console.log("attempt login");
			$http.post(url.BASE_API + '/api/signin', data)
				.success(function(data, status, headers, config) {
					console.log("success on api side");
					console.log(data);
					deferred.resolve(data);
				})
				.error(function (error) {
					// Erase the token if the user fails to log in
					delete $window.localStorage.token;
					deferred.reject();
				  });
			return deferred.promise;
		},
		me: function () {
			return $http.get(url.BASE_API + '/api/user/me');
		},
		logout: function (success) {
			var deferred = $q.defer();
			$http.post(url.BASE_API + '/api/logout')
				.then(function(data, status, headers, config) {
					deferred.resolve();
				})
				.error(function (error) {
					// Erase the token if the user fails to log in
					delete $window.localStorage.token;
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
			deferred.resolve();
		}else {
			deferred.reject();
		}
		return deferred.promise;
	}

	var tokenClaims = getClaimsFromToken();

}

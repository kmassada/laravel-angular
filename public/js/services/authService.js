angular.module('taskApp')
.factory('Auth', function ($http, $window, url) {
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
		var token = $window.sessionStorage.token;
		var user = {};
		if (typeof token !== 'undefined') {
			var encoded = token.split('.')[1];
			user = JSON.parse(urlBase64Decode(encoded));
		}
		return user;
	}

	var tokenClaims = getClaimsFromToken();

	return {
		register: function (data, success, error) {
			$http.post(url.BASE_API + '/api/register', data)
				.success(success)
				.error(function (error) {
					// Erase the token if the user fails to log in
					delete $window.sessionStorage.token;
				  });
		},
		signin: function (data, success, error) {
			$http.post(url.BASE_API + '/api/signin', data)
				.success(success)
				.error(function (error) {
					// Erase the token if the user fails to log in
					delete $window.sessionStorage.token;
				  });
		},
		logout: function (success) {
			tokenClaims = {};
			delete $window.sessionStorage.token;
			success();
		},
		getTokenClaims: function () {
			return tokenClaims;
		}
	};
});

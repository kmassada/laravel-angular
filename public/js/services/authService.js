angular.module('taskApp')
.factory('Auth', function ($http, $localStorage, url) {
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
		var token = $localStorage.token;
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
				.error(error);
		},
		signin: function (data, success, error) {
			$http.post(url.BASE_API + '/api/signin', data)
				.success(function(data) {
					console.log(data);
				})
				.error(error);
		},
		logout: function (success) {
			tokenClaims = {};
			delete $localStorage.token;
			success();
		},
		getTokenClaims: function () {
			return tokenClaims;
		}
	};
});

angular.module('taskApp')
	.factory('tokenStorage', tokenStorage);

tokenStorage.$inject = ['$q', '$window', '$rootScope'];

function tokenStorage($q, $window, $rootScope) {
	angular.element($window)
		.on('storage', function (event) {
			if (event.key === 'token') {
				$rootScope.$apply();
			}
		});

	var service = {
		setData: function (val) {
			$window.localStorage && $window.localStorage.setItem('token', val);
			return this;
		},
		getData: function () {
			return $window.localStorage && $window.localStorage.getItem('token');
		}
	};
	return service;
}

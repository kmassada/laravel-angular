angular.module('taskApp')
	.service('loginModal', loginModal);

loginModal.$inject = ['$modal', '$rootScope'];

function loginModal($modal, $rootScope) {
		function assignCurrentUser(user) {
				$rootScope.isLoggedIn = true;
				return user;
		}

		return function() {
				var instance = $modal.open({
						templateUrl: 'partials/_home-login.html',
						controller: 'UserAuthController',
						controllerAs: 'userCtrl'
				});

		return instance.result.then(assignCurrentUser);
		};

}

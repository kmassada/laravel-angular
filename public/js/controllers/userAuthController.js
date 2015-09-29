angular.module('taskApp')
.controller('UserAuthController', function ($rootScope, $scope, $state, $location, $window, Auth) {

		$scope.signin = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password
			};

			Auth.signin(formData, function (res) {
				$window.sessionStorage.token = res.token;
				$scope.loggedIn = true;
			}, function () {
				$rootScope.error = 'Invalid credentials.';
			}).then(function(){
				verifyAuth();
				$state.go('tasks');
			});

		};

		verifyAuth();

		function verifyAuth() {
			console.log(Object.keys(Auth.getTokenClaims()).length);
			if (Object.keys(Auth.getTokenClaims()).length !==0) {
				getMe();
				console.log($rootScope.user);
	      		$scope.loggedIn = true;
		    }
		}

		$scope.register = function () {
			var formData = {
				name: $scope.name,
				email: $scope.email,
				password: $scope.password,
				password_confirmation: $scope.password_confirmation
			};

			Auth.register(formData, function (res) {
				$state.go('home');
			}, function () {
				$rootScope.error = 'Failed to signup';
			});
		};

		$scope.logout = function () {
			Auth.logout(function (res) {
				$rootScope.user=null;
				$state.go('home');
			});
		};
		$rootScope.userLoggedIn= function () {
			if ($rootScope.user && $scope.loggedIn)
				return true;
			else
				return false;
		};
		$scope.reloadCtrl = function(){
			console.log('reloading...');
			$route.reload();
		};
		function getMe() {
			Auth.me()
			.success(function(data) {
				$rootScope.user=data.user;
			});
		}
		// $rootScope.token = $window.sessionStorage.token;
		// $scope.tokenClaims = Auth.getTokenClaims();
    }
);

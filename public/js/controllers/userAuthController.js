angular.module('taskApp')
.controller('UserAuthController', function ($rootScope, $scope, $location, $window, Auth) {
		function successAuth(res) {
			console.log(res);
			$window.sessionStorage.token = res.token;
			window.location = "/home";
		}

		$scope.signin = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password
			};

			Auth.signin(formData, function (res) {
				$window.sessionStorage.token = res.token;
				window.location = "/#/tasks";
			}, function () {
				$rootScope.error = 'Invalid credentials.';
			});
		};

		$scope.register = function () {
			var formData = {
				name: $scope.name,
				email: $scope.email,
				password: $scope.password,
				password_confirmation: $scope.password_confirmation
			};

			Auth.register(formData, successAuth, function () {
				$rootScope.error = 'Failed to signup';
			});
		};

		$scope.logout = function () {
			sessionStorage.logout(function () {
				window.location = "/";
			});
		};
		$scope.token = $window.sessionStorage.token;
		$scope.tokenClaims = Auth.getTokenClaims();
    }
);

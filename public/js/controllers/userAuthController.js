angular.module('taskApp')
.controller('UserAuthController', function ($rootScope, $scope, $location, $localStorage, Auth) {
		function successAuth(res) {
			$localStorage.token = res.token;
			window.location = "/";
		}

		$scope.signin = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password
			};

			Auth.signin(formData, successAuth, function () {
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
			Auth.logout(function () {
				window.location = "/";
			});
		};
		$scope.token = $localStorage.token;
		$scope.tokenClaims = Auth.getTokenClaims();
    }
);

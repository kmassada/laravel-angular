angular.module('taskApp')
.controller('UserAuthController', function ($rootScope, $scope, $state, $location, $window, $timeout, Auth, tokenStorage) {

		$scope.signin = function () {
			var formData = {
				email: $scope.email,
				password: $scope.password
			};

			Auth.signin(formData)
				.then(function (res) {
					console.log(res.token);
					tokenStorage.setData(res.token);
					getMe();
					$state.go('tasks');
				});

			};

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
				Alert.showAlert('danger', 'Signup', 'Failed to signup');
			});
		};

		$scope.logout = function () {
			console.log("loggging out");
			Auth.logout(function (res) {
				$rootScope.user=null;
				$state.go('home');
			});
		};
		$rootScope.userLoggedIn= function () {
			if ($rootScope.user)
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
    }
);

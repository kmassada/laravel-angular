angular.module('taskApp')
	.controller('UserAuthController', UserAuthController);

UserAuthController.$inject = ['$rootScope', '$state', 'Auth', 'tokenStorage'];

function UserAuthController($rootScope, $state, Auth, tokenStorage) {
	var userCtrl = this;
	userCtrl.signin = signin;
	userCtrl.register = register;
	userCtrl.logout = logout;
	$rootScope.userLoggedIn = userLoggedIn;

	 function signin() {
		var formData = {
			email: userCtrl.email,
			password: userCtrl.password
		};

		Auth.signin(formData)
			.then(function (res) {
				console.log(res.token);
				tokenStorage.setData(res.token);
				getMe();
				$state.go('tasks');
			});
	}

	 function register() {
		var formData = {
			name: userCtrl.name,
			email: userCtrl.email,
			password: userCtrl.password,
			password_confirmation: userCtrl.password_confirmation
		};

		Auth.register(formData, function (res) {
			$state.go('home');
		}, function() {
			Alert.showAlert('danger', 'Signup', 'Failed to signup');
		});
	}

	 function logout() {
		console.log("loggging out");
		Auth.logout(function (res) {
			$rootScope.user = null;
			$state.go('home');
		});
	}

	 function userLoggedIn() {
		if ($rootScope.user)
			return true;
		else
			return false;
	}

	 function getMe() {
		Auth.me()
			.success(function (data) {
				$rootScope.user = data.user;
			});
	}
}

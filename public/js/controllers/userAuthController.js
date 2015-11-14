angular.module('taskApp')
	.controller('UserAuthController', UserAuthController);

UserAuthController.$inject = ['$state', '$q', '$window', '$log', '$scope','$rootScope', 'Auth', 'User', 'appStorage', 'Alert', 'loginModal'];

function UserAuthController($state, $q, $window, $log, $scope,$rootScope, Auth, User, appStorage, Alert, loginModal) {
	var userCtrl = this;
	userCtrl.signin = signin;
	userCtrl.register = register;
	userCtrl.logout = logout;
	userCtrl.open = open;
	userCtrl.userLoggedIn = userLoggedIn;
	userCtrl.cancel = $scope.$dismiss;
	$rootScope.isLoggedIn = false;

	// loading variable
	userCtrl.loading = true;

	function userLoggedIn() {
		userCtrl.loading = true;
		var token = appStorage.getData('token');
		var user = appStorage.getData('user');

		$log.log("[userAuthController]: verify user state");
		var deferred = $q.defer();

		if(token && user){
			userCtrl.me = user;
			$rootScope.isLoggedIn = true;

			$log.info("[userAuthController]: user and token are present");
			deferred.resolve(true);
		}else{
			$rootScope.isLoggedIn = false;
			deferred.reject(false);
		}
		userCtrl.loading = false;
		return deferred.promise;
	}

	 function open() {
		 loginModal()
			 .then(function () {
				 $log.log("[appRun]: go next");
				 return $state.go(toState.name, toParams);
			 })
			 .catch(function () {
				 $log.warn("[appRun]: probs");
				 return $state.go('home');
			 });
	 }
	 function signin() {
		userCtrl.loading = true;
		var formData = {
			email: userCtrl.email,
			password: userCtrl.password
		};

		Auth.signin(formData)
			.then(function (res) {
				getMe()
				.then(function (value) {
					userLoggedIn()
					.then(function () {
						userCtrl.loading = false;
						$scope.$close(userCtrl.me);
						Alert.showAlert('success', '', 'Welcome!');
						$state.go('tasks');
					});
				});
			}, function () {
				console.log("bozo");
				Alert.showAlert('danger', 'Hmmm....', 'you must have entered wrong credentials!', 'local');
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
			Alert.showAlert('danger', 'Signup', 'Failed to signup', 'local');
		});
	}

	 function logout() {
		$log.error("loggging out");
			Auth.logout(function (res) {
				userCtrl.me = false;
		});
		$state.go('home');
		userLoggedIn();
	}
	function getMe() {
		 userCtrl.loading = true;

		 $log.log("[userAuthController]: retrieve and save to storage current user");
		 var deferred = $q.defer();

		 User.getAuthObject()
		 .then(function (user) {
			 var isAuthenticated = user.isAuthenticated === true;
			 if (isAuthenticated) {
				 deferred.resolve(true);
			 }
		 }, function () {
			 deferred.reject(false);
		 });
		 return deferred.promise;
	}

	$scope.$on('user:me', function(event,data) {
	   $log.log("[userAuthController]: listenner");
	   userCtrl.me = data.data.name;
	 });
}

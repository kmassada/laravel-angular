angular.module('taskApp')
	.run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'User'];

function runBlock($rootScope, $state, User) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		// if already authenticated...
		var isAuthenticated = User.isAuthenticated();
		// any public action is allowed
		var isPublicAction = angular.isObject(toState.data) && toState.data.isPublic === true;

		if (isPublicAction || isAuthenticated) {
			console.log("checking public routes/auth routes");
			return;
		}
		// stop state change
		console.log("stop route");
		event.preventDefault();
		// async load user
		User
			.getAuthObject()
			.then(function (user) {
				var isAuthenticated = user.isAuthenticated === true;
				if (isAuthenticated) {
					console.log("fukeri");
					// let's continue, use is allowed
					console.log(user.data);
					$rootScope.user = user.data;
					$state.go(toState, toParams);
					return;
				}
				// log on / sign in...
				$state.go("login");
			});
	});
}

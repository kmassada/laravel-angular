angular.module('taskApp')
	.run(runBlock);

runBlock.$inject = ['$rootScope', '$state', '$log', 'appStorage', 'User'];

function runBlock($rootScope, $state, $log, appStorage, User) {
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		// any public action is allowed
		var isPublicAction = angular.isObject(toState.data) && toState.data.isPublic === true;
		// token
		var token = appStorage.getData('token');
		var user = appStorage.getData('user');

		if (isPublicAction || token) {
			$log.log("[appRun]: checking public routes/auth routes");
			return;
		}
		// stop state change
		$log.warn("[appRun]: stop route");
		event.preventDefault();
		// async load user
		if (token && user) {
				$log.log("[appRun]: fukeri");
				// let's continue, use is allowed
				$state.go(toState, toParams);
				return;
		}else{
			$state.go("login");
			return;
		}
	});
	$rootScope.$on('$routeChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
	});
}

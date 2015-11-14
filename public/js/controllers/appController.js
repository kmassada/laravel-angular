angular.module('taskApp')
	.controller('AppController', AppController);

// inject the Task service into our controller
AppController.$inject = ['$rootScope', '$log', 'User'];

function AppController($rootScope, $log, User) {
	var appCtrl = this;
	appCtrl.visible=false;

	function itemClick(){
		appCtrl.visible=!appCtrl.visible;
		$log.log("[AppController]: toggling entire view");
	}
}

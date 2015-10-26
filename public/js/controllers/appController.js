angular.module('taskApp')
	.controller('AppController', AppController);

// inject the Task service into our controller
AppController.$inject = ['$rootScope', 'User'];

function AppController($rootScope, User) {
	var appCtrl = this;
}

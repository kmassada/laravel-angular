angular.module('taskApp')
	.controller('appController', appController);

// inject the Task service into our controller
appController.$inject = ['$scope'];

function appController($scope) {

	$scope
		.$on('LOAD', function(){
			$scope.loading=true;
		});
	$scope
		.$on('UNLOAD', function(){
			$scope.loading=false;
		});
}

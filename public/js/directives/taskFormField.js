angular.module('taskApp')
	.directive('taskFormField', taskFormField);
	
taskFormField.$inject = ['$timeout'];

function taskFormField($timeout) {
	var service = {
		restrict: 'EA',
		templateUrl: 'partials/directives/_form-field.html',
		replace: true,
		scope: {
			ngModel: '=',
			field: '@',
			live: '@',
			required: '@',
			fieldPlaceholder: '@',
			element: '@',
			options: '='
		},
		link: function ($scope, element, attr) {
			$scope.$on('ngModel:invalid', function () {
				$scope[$scope.field].$setDirty();
			});
			$scope.remove = function (ngModel) {
				delete $scope.ngModel;
				$scope.blurUpdate();
			};
			$scope.blurUpdate = function () {
				if ($scope.live !== 'false') {
					$scope.record.$update(function (updatedRecord) {
						$scope.record = updatedRecord;
					});
				}
			};
			var saveTimeout;
			$scope.update = function () {
				$timeout.cancel(saveTimeout);
				saveTimeout = $timeout($scope.blurUpdate, 1000);
			};
		}
	};
    return service;
}

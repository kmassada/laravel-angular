angular.module('taskApp')
	.directive('keyCodesField', keyCodesField);

taskFormField.$inject = ['$log'];

function keyCodesField($log) {

	var service = {
		restrict: 'A',
		link: function ($scope, $element, $attrs) {
			$element.bind("keypress", function (event) {
				var keyCode = event.which || event.keyCode;
				// $log.log(keyCode);
				if (keyCode == $attrs.code) {
					$log.log('KEY MATCH');
					$scope.$apply(function () {
					$log.log($attrs.keyCodesField);
						$scope.$eval($attrs.keyCodesField, {
							$event: event
						});
					});

				}
			});
		}

	};
	return service;
}

angular.module('taskApp')
	.factory('Alert', Alert);
	
Alert.$inject = ['$timeout', '$rootScope'];

function Alert($timeout, $rootScope) {
	var alertTimeout;
	var service = {
		showAlert: function (type, title, message, timeout) {
			$rootScope.alert = {
				hasBeenShown: true,
				show: true,
				type: type,
				message: message,
				title: title
			};
			$timeout.cancel(alertTimeout);
			alertTimeout = $timeout(function () {
				$rootScope.alert.show = false;
			}, timeout || 3000);
		}
	};
	return service;
}

angular.module('taskApp')
.factory('User', function ($timeout, $q, Auth) {

    var user = undefined;

    return {
        // async way how to load user from Server API
        getAuthObject: function () {
            var deferred = $q.defer();

            // later we can use this quick way -
            // - once user is already loaded
            if (user) {
                return $q.when(user);
            }
			Auth.me()
			.success(function(data) {
            	user = {isAuthenticated: true };
			});

            return deferred.promise;
        },

        // sync, quick way how to check IS authenticated...
        isAuthenticated: function () {
            return user !== undefined && user.isAuthenticated;
        }
    };
});

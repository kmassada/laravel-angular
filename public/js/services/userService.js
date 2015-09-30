angular.module('taskApp')
.factory('User', function ($timeout, $q, Auth) {

    var user = undefined;

    return {
        // async way how to load user from Server API
        getAuthObject: function () {
            var deferred = $q.defer();
			Auth.me()
			.success(function(data) {
                console.log("user/me is here");
            	user = {data: data.user, isAuthenticated: true };
                console.log(user);
                console.log(data.user);
                console.log("user is ready");
                deferred.resolve(user);
			});
            // later we can use this quick way -
            // - once user is already loaded
            if (user) {
                console.log("user is ready");
                return $q.when(user);
            }
            return deferred.promise;
        },

        // sync, quick way how to check IS authenticated...
        isAuthenticated: function () {
            console.log("check if user is auth");
            return user !== undefined && user.isAuthenticated;
        }
    };
});

angular.module('taskService', [])

.factory('Task', function($http) {

    return {
        // get all the tasks
        get : function() {
            return $http.get('/api/tasks');
        },

        // save a task (pass in task data)
        save : function(taskData) {
            // console.log($.param(taskData));
            return $http({
                method: 'POST',
                url: '/api/tasks',
                headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                data: $.param(taskData)
            });
        },

        // destroy a task
        destroy : function(id) {
            return $http.delete('/api/tasks/' + id);
        }
    }

});

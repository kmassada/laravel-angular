
angular.module('taskCtrl', [])

// inject the Task service into our controller
.controller('mainController', function($scope, $http, Task) {
    // object to hold all the data for the new task form
    $scope.taskData = {};

    // loading variable to show the spinning loading icon
    $scope.loading = true;

    // get all the tasks first and bind it to the $scope.tasks object
    // use the function we created in our service
    Task.get()
        .success(function(data) {
            $scope.tasks = data;
            $scope.loading = false;
        });

    // function to handle submitting the form
    $scope.submitTask = function() {
        $scope.loading = true;

        // save the task. pass in task data from the form
        // use the function we created in our service
        Task.save($scope.taskData)
            .success(function(data) {

                // if successful, we'll need to refresh the task list
                Task.get()
                    .success(function(getData) {
                        $scope.tasks = getData;
                        $scope.loading = false;
                    });

            })
            .error(function(data) {
                console.log(data);
            });
    };

    // function to handle deleting a task
    $scope.deleteTask = function(id) {
        $scope.loading = true;

        // use the function we created in our service
        Task.destroy(id)
            .success(function(data) {

                // if successful, we'll need to refresh the task list
                Task.get()
                    .success(function(getData) {
                        $scope.tasks = getData;
                        $scope.loading = false;
                    });

            });
    };

});

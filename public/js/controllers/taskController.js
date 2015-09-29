
angular.module('taskApp')

// inject the Task service into our controller
.controller('taskController', function($scope, $http, Task, authInterceptor) {
    $scope.createTask = true;

    // object to hold all the data for the new task form
    $scope.taskData = {};

    // loading variable to show the spinning loading icon
    $scope.loading = true;

    // get all the tasks first and bind it to the $scope.tasks object
    // use the function we created in our service
    Task.get()
        .success(function(data) {
            $scope.tasks = data.tasks;
            $scope.loading = false;
            $scope.taskTagOptions=data.tags.map(function(tag) {
                return {id: tag.id, name:tag.name};
            });
            $scope.taskPriorityOptions=data.priorities.map(function(priority) {
                return {id: priority.id, name:priority.name};
            });
        });

    // function to handle submitting the form
    $scope.addOrEditTask = function() {
        $scope.loading = true;

        if ($scope.taskForm.$valid) {
            alert('Form saved');
        } else {
          alert("There are invalid fields");
        }
        if ($scope.currentTask) {
            $scope.taskData.id=$scope.currentTask.id;

            // save the task. pass in task data from the form
            // use the function we created in our service
            Task.update($scope.taskData)
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

        } else {
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
        }

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

    $scope.newTask = function(id) {
        $scope.taskData = {};
    };
    // function to handle editing a task
    $scope.editTask = function(id) {

        // use the function we created in our service
        Task.show(id)
            .success(function(data) {
                console.log(data.tags);
                $scope.currentTask=data;
                $scope.taskData.title=$scope.currentTask.title;
                $scope.taskData.notes=$scope.currentTask.notes;
                $scope.taskData.priority_id=$scope.currentTask.priority_id;
                $scope.taskData.tag_list=$scope.currentTask.tags.map(function(tag) {
                    return tag.id;
                });
            });
    };
});

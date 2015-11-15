angular.module('taskApp')
	.controller('TaskController', TaskController);

// inject the Task service into our controller
TaskController.$inject = ['$http', '$q', '$scope', '$log', '$rootScope', 'Task', 'Alert'];


function TaskController($http, $q, $scope, $log, $rootScope, Task, Alert) {
	var taskCtrl = this;

	// object to hold all the data for the new task form
	taskCtrl.taskData = {};
	$rootScope.myTasks = {};

	// loading variable to show the spinning loading icon
	taskCtrl.loading = true;
	taskCtrl.isCollapsed = false;

	// get all the tasks first and bind it to the taskCtrl.tasks object
	// use the function we created in our service
	Task.get()
		.success(function (data) {
			loadTasks();
		});

	// function to handle editing a task
	// taskCtrl.editTask = editTask;

	// function to handle editing a task
	taskCtrl.completeTask = completeTask;

	function deleteTask(id) {

		taskCtrl.loading = true;

		// use the function we created in our service
		Task.destroy(id)
			.success(function (data) {

				// if successful, we'll need to refresh the task list
				loadTasks();
			});
	}

	function completeTask(task) {
		// taskCtrl.loading = true;
		task.status=task.status? 0 :1 ;// inversing
		myTask={};
		angular.copy(task, myTask);

		myTask.tag_list = task.tags.map(function (tag) {
			return tag.id;
		});

		$log.info("[TaskController]: Task marked as complete");
		$log.log(myTask);

		Task.update(myTask);
	}

	// function editTask(id) {
	// 	$log.info("[TaskController]: Fired");
	// 	// $scope.$emit('task:edit', id);
	// 	$rootScope.$broadcast('edit', id);
	//
	// }

	function loadTasks() {
		Task.get()
			.success(function (data) {
				taskCtrl.tasks = data.tasks;
				$rootScope.myTasks.count=data.tasks.length;
				taskCtrl.loading = false;
			});
	}

	$scope.$on('task:load', function(event, data) {
		$log.info("[TaskLoadController]: load");
		loadTasks();
	});
}

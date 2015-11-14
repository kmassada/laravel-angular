angular.module('taskApp')
	.controller('TaskController', TaskController);

// inject the Task service into our controller
TaskController.$inject = ['$http', '$q', '$log', '$rootScope', 'Task', 'Alert'];


function TaskController($http, $q, $log, $rootScope, Task, Alert) {
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
			$rootScope.myTasks.count=data.tasks.length;
			taskCtrl.tasks = data.tasks;
			taskCtrl.loading = false;
			taskCtrl.taskTagOptions = data.tags.map(function (tag) {
				return {
					id: tag.id,
					name: tag.name
				};
			});
			taskCtrl.taskPriorityOptions = data.priorities.map(function (priority) {
				return {
					id: priority.id,
					name: priority.name
				};
			});
		});

	// function to handle submitting the form
	taskCtrl.addOrEditTask = addOrEditTask;

	// function to handle deleting a task
	taskCtrl.deleteTask = deleteTask;

	taskCtrl.newTask = newTask;

	// function to handle editing a task
	taskCtrl.editTask = editTask;

	// function to handle editing a task
	taskCtrl.completeTask = completeTask;

	function addOrEditTask(form) {
		taskCtrl.loading = true;
		if (form.$invalid) {
			alert('invalid');
			return;
		}

		if (taskCtrl.currentTask) {
			taskCtrl.taskData.id = taskCtrl.currentTask.id;

			updateTask(taskCtrl.taskData);

		} else {
			// save the task. pass in task data from the form
			// use the function we created in our service
			Task.save(taskCtrl.taskData)
				.success(function (data) {

					// if successful, we'll need to refresh the task list
					loadTasks(data);
					refreshForm(form);
				})
				.error(function (data) {
					for (var key in data) {
						Alert.showAlert('danger', key, data[key]);
						$log.error("[TaskController]: Saving task didint work");
						$log.error(data[key]);
					}
				});
		}
	}

	function deleteTask(id) {

		taskCtrl.loading = true;

		// use the function we created in our service
		Task.destroy(id)
			.success(function (data) {

				// if successful, we'll need to refresh the task list
				loadTasks(data);
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

	function newTask(id) {
		taskCtrl.taskData = {};
		refreshForm(taskCtrl.taskForm);
	}

	function editTask(id) {

		// use the function we created in our service
		Task.show(id)
			.success(function (data) {
				taskCtrl.taskData=setTask(data);
			});
	}

	function updateTask(task) {
		// save the task. pass in task data from the form
		// use the function we created in our service
		Task.update(task)
			.success(function (data) {

				// if successful, we'll need to refresh the task list
				loadTasks(data);
				refreshForm(form);

			})
			.error(function (data) {
				for (var key in data) {
					Alert.showAlert('danger', key, data[key]);
					$log.error("[TaskController]: updating task didint work");
					$log.error(data[key]);
				}
			});
	}

	function setTask(data){
			task={};
			taskCtrl.currentTask = data;
			task.title = taskCtrl.currentTask.title;
			task.notes = taskCtrl.currentTask.notes;
			task.priority_id = taskCtrl.currentTask.priority_id;
			task.status = taskCtrl.currentTask.status;
			task.tag_list = taskCtrl.currentTask.tags.map(function (tag) {
				return tag.id;
			});
			return task;
	}

	function refreshForm(form) {
		taskCtrl.taskData = {};
		form.$setPristine();
	}

	function loadTasks(data) {
		Task.get()
			.success(function (data) {
				taskCtrl.tasks = data.tasks;
				$rootScope.myTasks.count=data.tasks.length;
				taskCtrl.loading = false;
			});

	}
}

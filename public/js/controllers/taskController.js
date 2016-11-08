angular.module('taskApp')
	.controller('TaskController', TaskController);

// inject the Task service into our controller
TaskController.$inject = ['$http', 'Task', 'Alert'];


function TaskController($http, Task, Alert) {
	var taskCtrl = this;

	// object to hold all the data for the new task form
	taskCtrl.taskData = {};

	// loading variable to show the spinning loading icon
	taskCtrl.loading = true;

	// get all the tasks first and bind it to the taskCtrl.tasks object
	// use the function we created in our service
	Task.get()
		.success(function (data) {
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

	function addOrEditTask(form) {
		taskCtrl.loading = true;
		if (form.$invalid) {
			alert('invalid');
			return;
		}

		if (taskCtrl.currentTask) {
			taskCtrl.taskData.id = taskCtrl.currentTask.id;

			// save the task. pass in task data from the form
			// use the function we created in our service
			Task.update(taskCtrl.taskData)
				.success(function (data) {

					// if successful, we'll need to refresh the task list
					loadTasks(data);
					refreshForm(form);

				})
				.error(function (data) {
					for (var key in data) {
						Alert.showAlert('danger', key, data[key]);
						console.log(data[key]);
					}
				});

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
						console.log(data[key]);
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

	function newTask(id) {
		taskCtrl.taskData = {};
		refreshForm(taskCtrl.taskForm);
	}

	function editTask(id) {

		// use the function we created in our service
		Task.show(id)
			.success(function (data) {
				console.log(data.tags);
				taskCtrl.currentTask = data;
				taskCtrl.taskData.title = taskCtrl.currentTask.title;
				taskCtrl.taskData.notes = taskCtrl.currentTask.notes;
				taskCtrl.taskData.priority_id = taskCtrl.currentTask.priority_id;
				taskCtrl.taskData.tag_list = taskCtrl.currentTask.tags.map(function (tag) {
					return tag.id;
				});
			});
	}

	function refreshForm(form) {
		taskCtrl.taskData = {};
		form.$setPristine();
	}

	function loadTasks(data) {
		Task.get()
			.success(function (data) {
				taskCtrl.tasks = data.tasks;
				taskCtrl.loading = false;
			});

	}
}

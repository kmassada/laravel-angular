
angular.module('taskApp')
	.controller('TaskFormController', TaskFormController);

// inject the Task service into our controller
TaskFormController.$inject = ['$modal', '$scope', '$rootScope', '$q', '$timeout', '$log', 'Alert', 'Task'];


function TaskFormController($modal, $scope, $rootScope, $q, $timeout, $log, Alert, Task) {
	var taskFormCtrl = this;

	$scope.$on('edit', function(event, id) {
		$log.info("[TaskFormController]: recieve");
		openTask(id);
	});

	taskTagOptions = taskPriorityOptions = {};

	taskFormCtrl.open = openTask;

	// object to hold all the data for the new task form
	taskFormCtrl.taskData = {};

	// loading variable to show the spinning loading icon
	taskFormCtrl.loading = true;

	// function to handle submitting the form
	taskFormCtrl.addOrEditTask = addOrEditTask;

	// function to handle deleting a task
	taskFormCtrl.deleteTask = deleteTask;

	// new task creation
	taskFormCtrl.newTask = newTask;

	// function to handle editing a task
	taskFormCtrl.completeTask = completeTask;

	function addOrEditTask(form, taskData) {
		taskFormCtrl.taskData=taskData;
		var deferred = $q.defer();
		taskFormCtrl.loading = true;
		if (form.$invalid) {
			alert('invalid');
			return false;
		}

		if (taskFormCtrl.currentTask) {
			taskFormCtrl.taskData.id = taskFormCtrl.currentTask.id;
			$log.log("[TaskFormController]: passing to updating");
			$log.log(taskFormCtrl.currentTask);
			$log.log(taskFormCtrl.taskData);
			updateTask(taskFormCtrl.taskData).then(function () {
				deferred.resolve(true);
			}, function (data) {
				deferred.reject(data);
			});

		} else {
			// save the task. pass in task data from the form
			// use the function we created in our service
			Task.save(taskFormCtrl.taskData)
				.success(function (data) {

					// if successful, we'll need to refresh the task list
					deferred.resolve(true);
				})
				.error(function (data) {
					for (var key in data) {
						Alert.showAlert('danger', key, data[key], 'local');
						$log.error("[TaskController]: Saving task didint work");
						$log.error(data[key]);
						deferred.reject(data);
					}
				});
		}
		return deferred.promise;
	}


	function newTask(id) {
		taskFormCtrl.taskData = {};
		refreshForm(taskFormCtrl.taskForm);
	}

	function deleteTask(id) {
		// use the function we created in our service
		Task.destroy(id);
	}

	function completeTask(task) {
		// taskFormCtrl.loading = true;
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

	function updateTask(task) {
		var deferred = $q.defer();
		// save the task. pass in task data from the form
		// use the function we created in our service
		$log.log("[TaskFormController]: Updating now");
		$log.log(task);

		Task.update(task)
			.success(function (data) {
				$log.log("[TaskFormController]: updated in API");
				$log.log(data);
				// if successful, we'll need to refresh the task list
				deferred.resolve(true);
			})
			.error(function (data) {
				for (var key in data) {
					Alert.showAlert('danger', key, data[key], 'local');
					$log.error("[TaskController]: updating task didint work");
					$log.error(data[key]);
					deferred.reject(data);
				}
			});
			return deferred.promise;
	}

	function setTask(data){
			$log.log("[TaskFormController]: set");
			task={};
			taskFormCtrl.currentTask = data;
			task.title = taskFormCtrl.currentTask.title;
			task.notes = taskFormCtrl.currentTask.notes;
			task.priority_id = taskFormCtrl.currentTask.priority_id;
			task.status = taskFormCtrl.currentTask.status;
			task.tag_list = taskFormCtrl.currentTask.tags.map(function (tag) {
				return tag.id;
			});
			$log.log(task);
			return task;
	}

	function refreshForm(form) {
		taskFormCtrl.taskData = {};
		form.$setPristine();
	}

	function loadOptions() {
		Task.get()
			.success(function (data) {
				taskFormCtrl.loading = false;
				taskTagOptions = data.tags.map(function (tag) {
					return {
						id: tag.id,
						name: tag.name
					};
				});
				taskPriorityOptions = data.priorities.map(function (priority) {
					return {
						id: priority.id,
						name: priority.name
					};
				});
			});
	}

 	  function openTask(id) {
			loadOptions();
			$log.info("[TaskFormController]: open");
			$log.log(id);

		var modalInstance = $modal.open({
					templateUrl: 'partials/_tasks-form.html',
					controller: function ($scope, $modalInstance) {
						// set data for task in modal
						Task.show(id)
						.success(function (id) {
								$scope.taskData = setTask(id);
								$scope.taskPriorityOptions = taskPriorityOptions;
								$scope.taskTagOptions = taskTagOptions;

								$log.log($scope);
						});

						$scope.saveOrUpdate = function (form) {
							addOrEditTask(form, $scope.taskData)
							.then(function () {
								$rootScope.$broadcast('task:load');

								$modalInstance.close($scope.taskData);
							});
						};

						$scope.cancel = function () {
							$modalInstance.dismiss('cancel');
						};
					},
					resolve: {
						taskData: function() {
          		return $scope.taskData;
        		}
			  	},
			});

		modalInstance.result.then(function(data) {
			Alert.showAlert('success', 'success', data, 'local');
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
	}


}

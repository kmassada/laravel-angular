<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Task;
use App\Http\Requests;
use App\Http\Requests\TaskRequest;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      $tasks=Task::all();
      return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        return view('tasks.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(TaskRequest $request)
    {
        $this->createTask($request);
        return response()->json(array('success' => true));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function show(Task $task) {
        return response()->json($task);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return Response
     */
    public function edit(Task $task)
    {
        return view('tasks.edit', compact('task'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  int  $id
     * @return Response
     */
    public function update(Task $task, TaskRequest $request)
    {
        $task->update($request->all());
        $this->syncTags($todo, $request->input('tag_list'));

        return response()->json(array('success' => true));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(array('success' => true));
    }

    /**
     * sync tags to Task
     * @param  Task   $task Object
     * @return void
     */
    private function syncTags(Task $task, array $tags) {
      $task->tags()->sync($tags);
    }

    /**
     * create a Task
     * @param  TaskRequest $request
     * @return todo               created todo Object
     */
    private function createTask(TaskRequest $request) {
      $task=Task::create($request->all());
      $this->syncTags($task, $request->input('tag_list'));

      return $task;
    }
}

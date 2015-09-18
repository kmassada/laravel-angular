<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\JWTAuth;
use App\Task;
use App\Tag;
use App\Priority;
use App\Http\Requests;
use App\Http\Requests\TaskRequest;
use App\Http\Controllers\Controller;

class TaskController extends Controller
{

  protected $auth;

      public function __construct(JWTAuth $auth)
      {
        $this->auth = $auth;
      }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
      try {

          if (! $user = $this->auth->parseToken()->authenticate()) {
              return response()->json(['user_not_found'], 404);
          }

      } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

          return response()->json(['token_expired'], $e->getStatusCode());

      } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

          return response()->json(['token_invalid'], $e->getStatusCode());

      } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

          return response()->json(['token_absent'], $e->getStatusCode());

      }
      $data['user']=$user;
      $data['tasks']=Task::with('priority','tags')->get();
      $data['priorities']=Priority::all();
      $data['tags']=Tag::all();
      return response()->json($data);
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
        $task=Task::with('priority','tags')->where('id',$task->id)->first();
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
        $this->syncTags($task, $request->input('tag_list'));

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
     * @return task               created task Object
     */
    private function createTask(TaskRequest $request) {
      $task=Task::create($request->all());
      $this->syncTags($task, $request->input('tag_list'));

      return $task;
    }
}

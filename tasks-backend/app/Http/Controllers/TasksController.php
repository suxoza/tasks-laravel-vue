<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Requests\SetTaskStatusRequest;
use App\Models\Task;


class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::where('owner_id', auth()->id())->orderBy('id', 'desc')->paginate(30); 
        return response()->json($tasks);
    }

    /**
     * Display the specified resource.
     *
     * @param  Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return response()->json($task);
    }

    /**
     * Store a newly created resource in storage.
    */
    public function store(CreateTaskRequest $request)
    {
        $task = auth()->user()->tasks()->create($request->all());
        return response()->json($task, 201);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $task->update($request->all());
        return response()->json($task);
    }

    /**
     * Set status
     */
    public function setStatus(SetTaskStatusRequest $request, Task $task)
    {
        $task->update(['is_active' => !$task->is_active]);
        return response()->json($task);
    }
    
    /**
     * Remove the specified resource from storage.
    */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message' => 'Task deleted successfully'], 200);
    
    }
}

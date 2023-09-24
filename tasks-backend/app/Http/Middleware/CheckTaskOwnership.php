<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Task;

class CheckTaskOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $task = $request->route('task');
        if($task){
            if(is_numeric($task))
                $task = Task::findOrFail($task);
            if ($task->owner_id != auth()->id()) 
                return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}

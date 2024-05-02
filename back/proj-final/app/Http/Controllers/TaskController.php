<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Task;
use App\Models\User;


class TaskController extends Controller
{
    public function index(Request $request)
    {
        // Order and count
        $taskList = Task::all();

        // Filter?
        if ($search = $request->get('search')) {
            if(!$taskList->where('description', 'like', "%{$search}%")){
                return response()->json([
                    "success" => false,
                    "message"    => "Cap event correspon amb la teva cerca",
                ]);
            }
            $taskList->where('description', 'like', "%{$search}%");
        }
        
        return response()->json([
            "success" => true,
            "tasques"    =>$taskList,
        ]);
    }

    public function event_tasks(Request $request, $id)
    {
        // Order and count
        $taskList = Task::all();
        $eventTasques = $taskList->where('event_id', 'like', $id);
        if(!$eventTasques){
            return response()->json([
                "success" => false,
                "message"    => "Cap event correspon amb la teva cerca",
            ]);
        }

        return response()->json([
            "success" => true,
            "tasques"    =>$eventTasques,
        ]);
    }
    public function user_tasks(Request $request, $id)
    {
        // Order and count
        $user = User::find($id);
        $taskList = Task::all();
        $userTasques = $taskList->where('responsable', 'like', $user->name || $user->branca || $user->carrec);
        if(!$userTasques){
            return response()->json([
                "success" => false,
                "message"    => "Cap usuari correspon amb la teva cerca",
            ]);
        }

        return response()->json([
            "success" => true,
            "tasques"    =>$userTasques,
        ]);
    }

    public function show(Request $request, $id){
        $task = Task::find($id);
        if($task){
            return response()->json([
                "success" => true,
                "task"    =>$task
            ]);
        }
        else{
            return response()->json([
                "success" => false,
                "message"    => "Task not found",
            ]);
        }
    }

    public function create(Request $request)
    {
        // Validar dades del formulari
        $validatedData = $request->validate([

        ]);
        // Obtenir dades del formulari
        $name = $request->get('name');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');
        $event_id = $request->get('event_id');
        $author_id = $request->user()->id; //auth()->user()->id
        $date = $request->get('data_limit');
        

        // Desar dades a BD
        Log::debug("Saving place at DB...");
        $task = Task::create([
            'name'          => $name,
            'description'   => $description,
            'event_id'      => $event_id,
            'author_id'     => $author_id,
            'visibility'    => $visibility,
            'status'        => 0,
            'data_limit'    => $date,
        ]);

        return response()->json([
            "success" => true,
            "task" => $task
        ]);
    }

    public function update(Request $request, $id){
        $task = Task::find($id);

        $name = $request->get('name');
        $responsable = $request->get('responsable');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');
        $date = $request->get('data_limit');

        if (empty($task)) {
            return response()->json([
                'success'  => false,
                'message' => 'event not found'
            ], 404);
        }
        if (!empty($name)) {
            $task->name = $name;
        }
        if (!empty($description)) {
            $task->description = $description;
        }
        if (!empty($responsable)) {
            $task->description = $description;
        }
        if (!empty($visibility)) {
            $task->visibility = $visibility;
        }
        if (!empty($date)) {
            $task->data_limit = $date;
        }
        if (!empty($status)) {
            $task->status = $status;
        }
        $task->save();
        
        return response()->json([
            "success" => true,
            "task" => $task
        ]);
    }

    public function delete(Request $request, $id){
        $task = Task::find($id);
        $author_id = $request->user()->id;
        $role = $request->user()->role_id;
        if(!$task){
            return response()->json([
                'success'  => false,
                'message' => 'task not found'
            ], 404);
        }
        if($task->author_id == $author_id || $role == 1){
            $task->delete();
            return response()->json([
                'success'  => true,
                'task' => $task,
            ],);
        }
        else{
            return response()->json([
                'success'  => false,
                'message' => 'User not authorized to delete this task'
            ],);
        }

    }
}

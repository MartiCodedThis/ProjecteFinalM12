<?php

namespace App\Http\Controllers;

use App\Models\BrancaTask;
use App\Models\CarrecTask;
use App\Models\UserTask;
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
            'name'          => 'required',
            'description'   => 'required',
            'event_id'      => 'required',
            'visibility'    => 'required',
            'data_limit'    => 'required',
        ]);
        if(!$validatedData){
            return response()->json([
                "success" => false,
                "message" => "Missing form fields"
            ]);
        }
        // Obtenir dades del formulari
        $name = $request->get('name');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');
        $event_id = $request->get('event_id');
        $author_id = $request->user()->id; //auth()->user()->id
        $date = $request->get('data_limit');

        $task = Task::create([
            'name'          => $name,
            'description'   => $description,
            'event_id'      => $event_id,
            'author_id'     => $author_id,
            'visibility'    => $visibility,
            'status'        => 0,
            'data_limit'    => $date,
        ]);

        Log::info($task);

        $branca_id = $request->get('branca_id');
        $carrec_id = $request->get('carrec_id');
        $responsables = $request->get('responsables');
        if(!$branca_id && !$carrec_id && !$responsables){
            return response()->json([
                "success" => false,
                "message"    => "There must be at least one responsible entity",
            ]);
        }
        $relations = [];
        if($branca_id){
            $newTask = new BrancaTask;
            $relation = $newTask->create([
                'task_id' => $task->id,
                'branca_id' => $branca_id
            ]);
            array_push($relations, $relation);
        }

        if($carrec_id){
            $newTask = new CarrecTask;
            $relation = $newTask->create([
                'task_id' => $task->id,
                'carrec_id' => $carrec_id
            ]);
            array_push($relations, $relation);
        }

        if($responsables){
            Log::info($responsables);
            foreach ($responsables as $responsable) {
                $newTask = new UserTask;
                $relation = $newTask->create([
                    'task_id' => $task->id,
                    'user_id' => $responsable
                ]);
                array_push($relations, $relation);
            }
        }
        return response()->json([
            "success" => true,
            "task" => $task,
            "relations" => $relations
        ]);
    }

    public function update(Request $request, $id){
        $task = Task::find($id);
        $name = $request->get('name');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');
        $date = $request->get('data_limit');
        $status = $request->get('status');

        $branca_id = $request->get('branca_id');
        $carrec_id = $request->get('carrec_id');
        $responsables = $request->get('responsables');
        $relations = [];

        if (empty($task)) {
            return response()->json([
                'success'  => false,
                'message' => 'Task not found'
            ], 404);
        }
        if (!empty($name)) {
            $task->name = $name;
        }
        if (!empty($description)) {
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
        if (!empty($branca_id)) {
            $taskExists = BrancaTask::where([
                'branca_id' => $branca_id,
                'task_id' => $task->id
            ])->exists();
            if(!$taskExists){
                $newTask = new BrancaTask;
                $relation = $newTask->create([
                    'branca_id' => $branca_id,
                    'task_id' => $task->id
                ]);
                array_push($relations, $relation);
            }
        }
        if (!empty($carrec_id)) {
            $taskExists = CarrecTask::where([
                'carrec_id' => $carrec_id,
                'task_id' => $task->id
            ])->exists();
            if(!$taskExists){
                $newTask = new CarrecTask;
                $relation = $newTask->create([
                    'carrec_id' => $carrec_id,
                    'task_id' => $task->id
                ]);
                array_push($relations, $relation);
            }
        }
        if (!empty($responsables)) {
            foreach ($responsables as $responsable) {
                $taskExists = UserTask::where([
                    'user_id' => $responsable,
                    'task_id' => $task->id
                ])->exists();
                if(!$taskExists){
                    $newTask = new UserTask;
                    $relation = $newTask->create([
                        'user_id' => $responsable,
                        'task_id' => $task->id
                    ]);
                    array_push($relations, $relation);
                }
            }
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
            $brancaRelation = BrancaTask::where([
                'task_id' => $task->id
            ])->get();
            $carrecRelation = CarrecTask::where([
                'task_id' => $task->id
            ])->get();
            $userRelation = UserTask::where([
                'task_id' => $task->id
            ])->get();
            if($brancaRelation){
                foreach($brancaRelation as $b){
                    $b->delete();
                } 
            }
            if($carrecRelation){
                foreach($carrecRelation as $c){
                    $c->delete();
                }
            }
            if($userRelation){
                foreach ($userRelation as $u){
                    $u->delete();
                }
            }

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

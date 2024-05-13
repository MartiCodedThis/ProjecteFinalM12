<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\BrancaTask;
use App\Models\CarrecTask;
use App\Models\UserTask;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Task;
use App\Models\User;


class TaskController extends Controller
{
    public function index(Request $request, $id)
    {
        // Order and count
        $taskList = Task::where('event_id',$id)->get();
        
        return response()->json([
            "success" => true,
            "tasks"    =>$taskList,
        ],200);
    }

    public function show(Request $request, $id){
        $task = Task::find($id);
        $responsibleUsers = UserTask::where('task_id',$id)->get();
        $responsibleBranques = BrancaTask::where('task_id',$id)->get();
        $responsibleCarrecs = CarrecTask::where('task_id',$id)->get();
        if(!$responsibleUsers && !$responsibleBranques && !$responsibleUsers){
            return response()->json([
                "success" => false,
                "message"    => "No one is assigned to this task",
            ],404);
        }
        if(!$responsibleUsers){
            $responsibleUsers = "No user has been assigned";
        }
        if(!$responsibleBranques){
            $responsibleBranques = "No branch has been assigned";
        }
        if(!$responsibleCarrecs){
            $responsibleCarrecs = "No administrative position has been assigned";
        }
        if($task){
            return response()->json([
                "success" => true,
                "task"    =>$task,
                "users" =>$responsibleUsers,
                "branca" => $responsibleBranques,
                "carrec" => $responsibleCarrecs
            ],200);
        }
        else{
            return response()->json([
                "success" => false,
                "message"    => "Task not found",
            ],404);
        }
    }

    //No route created, show method also returns this
    public function task_responsibles(Request $request, $task_id){
        $responsibleUsers = UserTask::where('task_id',$task_id)->get();
        $responsibleBranques = BrancaTask::where('task_id',$task_id)->get();
        $responsibleCarrecs = CarrecTask::where('task_id',$task_id)->get();
        if(!$responsibleUsers && !$responsibleBranques && !$responsibleUsers){
            return response()->json([
                "success" => false,
                "message"    => "No one is assigned to this task",
            ],404);
        }
        if(!$responsibleUsers){
            $responsibleUsers = "No user has been assigned";
        }
        if(!$responsibleBranques){
            $responsibleBranques = "No branch has been assigned";
        }
        if(!$responsibleCarrecs){
            $responsibleCarrecs = "No administrative position has been assigned";
        }
        return response()->json([
            "success" => true,
            "user_tasks" =>$responsibleUsers,
            "branca_tasks" => $responsibleBranques,
            "carrec_tasks" => $responsibleCarrecs
        ],200);
    }

    public function user_tasks(Request $request, $id){
        $relationList = UserTask::where('user_id',$id)->get();
        $user = User::find($id);

        $taskList = [];
        $ids = [];
        foreach ($relationList as $relation) {
            $task_id = $relation->task_id;
            $ids[] = $task_id;
            $task = Task::find($task_id);
            if ($task) {
                $taskList[] = $task;
            }
        }
        if($user->carrec){
            $carrecTasks = CarrecTask::where('carrec_id', $user->carrec_id)->get();
            foreach ($carrecTasks as $relation){
                $task_id = $relation->task_id;
                if(!in_array($task_id, $ids)){
                    $ids[] = $task_id;
                    $task = Task::find($task_id);
                    if ($task) {
                        $taskList[] = $task;
                    }
                }
            }
        }
        $brancaTasks = BrancaTask::where('branca_id', $user->branca_id)->get();
        foreach ($brancaTasks as $relation) {
            $task_id = $relation->task_id;
            if(!in_array($task_id, $ids)){
                $ids[] = $task_id;
                $task = Task::find($task_id);
                if ($task) {
                    $taskList[] = $task;
                }
            }
        }
        $taskList = collect($taskList)->sortByDesc('data_limit')->values();

        if($taskList){
            return response()->json([
                "success" => true,
                "user_tasks" =>$taskList
            ],200);
        }
        else{
            return response()->json([
                "success" => false,
                "message"    => "User has no tasks",
            ],404);
        }
    }

    public function branca_tasks(Request $request, $id){
        $taskList = BrancaTask::where('branca_id',$id)->get();
        if($taskList){
            return response()->json([
                "success" => true,
                "branca_tasks" =>$taskList
            ],200);
        }
        else{
            return response()->json([
                "success" => false,
                "message"    => "This branch has no tasks",
            ],404);
        }
    }
    
    public function carrec_tasks(Request $request, $id){
        $taskList = CarrecTask::where('carrec_id',$id)->get();
        if($taskList){
            return response()->json([
                "success" => true,
                "carrec_tasks" =>$taskList
            ],200);
        }
        else{
            return response()->json([
                "success" => false,
                "message"    => "This charge has no tasks",
            ],404);
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
            ],400);
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
            ],400);
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
                $user = User::find($responsable);
                $relation = $newTask->create([
                    'task_id' => $task->id,
                    'user_id' => $responsable,
                    'user_name' => $user->name
                ]);
                array_push($relations, $relation);
            }
        }
        return response()->json([
            "success" => true,
            "task" => $task,
            "relations" => $relations
        ],201);
    }

    public function update(Request $request, $id){
        Log::info($request);
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
        if ($status != null) {
            Log::info($status);
            $task->status = $status;
            Log::info($task->status);
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
        Log::info($task);
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
            ],200);
        }
        else{
            return response()->json([
                'success'  => false,
                'message' => 'User not authorized to delete this task'
            ],401);
        }

    }
}

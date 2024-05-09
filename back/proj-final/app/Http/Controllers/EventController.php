<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Support\Facades\Log;

class EventController extends Controller
{
    public function index(Request $request)
    {
        // Order and count
        $eventList = Event::all();

        // Filter?
        if ($search = $request->get('search')) {
            if(!$eventList->where('description', 'like', "%{$search}%")){
                return response()->json([
                    "success" => false,
                    "message"    => "Cap event correspon amb la teva cerca",
                ],404);
            }
            $eventList->where('description', 'like', "%{$search}%");
        }
        
        return response()->json([
            "success" => true,
            "events"    =>$eventList,
        ],200);
    }

    public function show(Request $request, $id){
        $event = Event::find($id);
        if($event){
            return response()->json([
                "success" => true,
                "event"    =>$event
            ],200);
        }
        else{
            return response()->json([
                "success" => false,
                "message"    => "Event not founddd",
            ],404);
        }
    }
    public function create(Request $request)
    {
        // Validar dades del formulari
        $request->validate([
            'name'=> 'required',
            'description'=> 'required',
            'visibility'=> 'required',
            'date'=>'required'
        ]);

        // Obtenir dades del formulari
        $name = $request->get('name');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');
        $author_id = $request->user()->id; //auth()->user()->id
        $date = $request->get('date');

        // Desar dades a BD
        Log::debug("Saving place at DB...");
        $event = Event::create([
            'name'          => $name,
            'description'   => $description,
            'author_id'     => $author_id,
            'visibility'    => $visibility,
            'status'        => 0,
            'date'          => $date,
        ]);

        return response()->json([
            "success" => true,
            "event" => $event
        ],201);
    }

    public function update(Request $request, $id){
        $event = Event::find($id);

        $name = $request->get('name');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');
        $date = $request->get('date');
        $status = $request->get('status');

        if (empty($event)) {
            return response()->json([
                'success'  => false,
                'message' => 'event not found'
            ], 404);
        }
        if (!empty($name)) {
            $event->name = $name;
        }
        if (!empty($description)) {
            $event->description = $description;
        }
        if (!empty($visibility)) {
            $event->visibility = $visibility;
        }
        if (!empty($date)) {
            $event->date = $date;
        }
        if (!empty($status)) {
            $event->status = $status;
        }
        $event->save();
        
        return response()->json([
            "success" => true,
            "event" => $event
        ],200);
    }

    public function delete(Request $request, $id){
        $event = Event::find($id);
        $author_id = $request->user()->id;
        $role = $request->user()->role_id;
        if(!$event){
            return response()->json([
                'success'  => false,
                'message' => 'Event not found'
            ], 404);
        }
        if($event->author_id == $author_id || $role == 1){
            $event->delete();
            return response()->json([
                'success'  => true,
                'event' => $event,
            ],200);
        }
        else{
            return response()->json([
                'success'  => false,
                'message' => 'User not authorized to delete this event'
            ],401);
        }

    }
}

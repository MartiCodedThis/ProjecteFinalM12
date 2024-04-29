<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;

class EventController extends Controller
{
    public function index(Request $request)
    {
        // Order and count
        $eventList = Event::orderBy('created_at', 'desc');

        // Filter?
        if ($search = $request->get('search')) {
            if(!$eventList->where('description', 'like', "%{$search}%");){
                return response()->json([
                    "success" => false,
                    "message"    => "Cap event correspon amb la teva cerca",
                ]);
            }
            $eventList->where('description', 'like', "%{$search}%");
        }
        
        return response()->json([
            "success" => true,
            "events"    => $eventList,
        ]);
    }
    public function create()
    {
        return view("places.create");
    }
}

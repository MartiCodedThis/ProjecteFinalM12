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
            "events"    =>$eventList,
        ]);
    }
    public function create()
    // protected $fillable = [
    //     'id',
    //     'name',
    //     'description',
    //     'visibility',
    //     'status',
    //     'author_id',
    //     'date'
    // ];
    {
        // Validar dades del formulari
        $validatedData = $request->validated();
        
        // Obtenir dades del formulari
        $name        = $request->get('name');
        $description = $request->get('description');
        $visibility  = $request->get('visibility');

        // Desar dades a BD
        Log::debug("Saving place at DB...");
        $place = Place::create([
            'name'          => $name,
            'description'   => $description,
            'author_id'     => auth()->user()->id,
            'visibility'    => $visibility,
        ]);
        // Patró PRG amb missatge d'èxit
        return redirect()->route('places.show', $place)
            ->with('success', __(':resource successfully saved', [
                'resource' => __('Place')
            ]));
    }
}

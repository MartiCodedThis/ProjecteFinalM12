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
        // Validar dades del formulari
        $validatedData = $request->validated();
        
        // Obtenir dades del formulari
        $name        = $request->get('name');
        $description = $request->get('description');
        $upload      = $request->file('upload');
        $latitude    = $request->get('latitude');
        $longitude   = $request->get('longitude');
        $visibility  = $request->get('visibility');

        // Desar fitxer al disc i inserir dades a BD
        $file = new File();
        $fileOk = $file->diskSave($upload);

        if ($fileOk) {
            // Desar dades a BD
            Log::debug("Saving place at DB...");
            $place = Place::create([
                'name'          => $name,
                'description'   => $description,
                'file_id'       => $file->id,
                'latitude'      => $latitude,
                'longitude'     => $longitude,
                'author_id'     => auth()->user()->id,
                'visibility_id' => $visibility,
            ]);
            Log::debug("DB storage OK");
            // Patró PRG amb missatge d'èxit
            return redirect()->route('places.show', $place)
                ->with('success', __(':resource successfully saved', [
                    'resource' => __('Place')
                ]));
        } else {
            Log::debug("Disk storage FAILS");
            // Patró PRG amb missatge d'error
            return redirect()->route("places.create")
                ->with('error', __('ERROR uploading file'));
        }
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Http\Requests\EventStoreRequest;
use App\Http\Requests\EventUpdateRequest;

use App\Models\Event;
use App\Models\File;
use App\Http\Resources\EventResource;
use App\Http\Resources\PaginateCollection;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Event::class);

        $query = Event::withCount(['comments']);

        // Filters
        if ($body = $request->get('body')) {
            $query->where('body', 'like', `%{$body}%`);
        }
        
        if ($visibility = $request->get('visibility')) {
            $query->where('visibility_id', $visibility); 
        }
        
        if ($author = $request->get('author')) {
            $query->where('author_id', $author); 
        }

        // Pagination
        $paginate = $request->get('paginate', 0);
        $data = $paginate ? $query->paginate() : $query->get();

        return response()->json([
            'success' => true,
            'data'    => new PaginateCollection($data, EventResource::class)
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  EventStoreRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventStoreRequest $request)
    {
        $this->authorize('create', Event::class);

        $validatedData = $request->validated();
        $upload        = $request->file('upload');

        $file = new File();
        $fileOk = $file->diskSave($upload);

        if ($fileOk) {
            Log::debug("Saving Event at DB...");
            $event = Event::create([
                'body'          => $validatedData['body'],
                'file_id'       => $file->id,
                'visibility_id' => $validatedData['visibility'],
                'author_id'     => auth()->user()->id,
            ]);
            Log::debug("DB storage OK");
            return response()->json([
                'success' => true,
                'data'    => new EventResource($event)
            ], 201);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Error uploading file'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = Event::find($id);
        
        if ($event) {
            $this->authorize('view', $event);
            $event->loadCount(['comments']);
            return response()->json([
                'success' => true,
                'data'    => new EventResource($event)
            ], 200);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Event not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  EventUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update_workaround(EventUpdateRequest $request, $id)
    {
        // File upload workaround
        return $this->update($request, $id);
    }
    
    /**
     * Update the specified resource in storage.
     *
     * @param  EventUpdateRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(EventUpdateRequest $request, $id)
    {
        $event = Event::find($id);

        if (empty($event)) {
            return response()->json([
                'success'  => false,
                'message' => 'event not found'
            ], 404);
        }
        
        $this->authorize('update', $event);
        $validatedData = $request->validated();
        $upload        = $request->file('upload');
        
        if (is_null($upload) || $event->file->diskSave($upload)) {
            Log::debug("Updating DB...");
            if (!empty($validatedData['body'])) {
                $event->body = $validatedData['body'];
            }
            if (!empty($validatedData['latitude'])) {
                $event->latitude = $validatedData['latitude'];
            }
            if (!empty($validatedData['longitude'])) {
                $event->longitude = $validatedData['longitude'];
            }
            if (!empty($validatedData['visibility'])) {
                $event->visibility_id = $validatedData['visibility'];
            }
            $event->save();
            Log::debug("DB storage OK");
            return response()->json([
                'success' => true,
                'data'    => new EventResource($event)
            ], 200);
        } else {
            return response()->json([
                'success'  => false,
                'message' => 'Error uploading file'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = Event::find($id);

        if (empty($event)) {
            return response()->json([
                'success'  => false,
                'message' => 'Event not found'
            ], 404);
        }

        $this->authorize('delete', $event);
        $event->delete();
        $event->file->diskDelete();
        
        return response()->json([
            'success' => true,
            'data'    => new EventResource($event)
        ], 200);
    }
}

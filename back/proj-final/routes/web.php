<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\TokenController;

Route::get('/', function () {
    Log::info('Somebody entered');
    return response()->json([
        "success"   => true,
        "message" => "You saw me!"
    ], 200);;
});


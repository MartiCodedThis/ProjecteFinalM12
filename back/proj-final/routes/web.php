<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\TokenController;

Route::get('/', function () {
    return response()->json([
        "success"   => true,
        "message" => "Hello there!"
    ], 200);
});


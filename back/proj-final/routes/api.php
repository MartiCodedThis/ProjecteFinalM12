<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});

// Route::get('user', [TokenController::class, 'user'])->middleware('auth:sanctum');
Route::post('register', [TokenController::class, 'register'])->middleware('guest');
Route::post('login', [TokenController::class, 'login'])->middleware('guest');
Route::post('logout', [TokenController::class, 'logout'])->middleware('auth:sanctum');
Route::post('authorize', [TokenController::class, 'authorize'])->middleware('auth:sanctum');
Route::post('unauthorize', [TokenController::class, 'unauthorize'])->middleware('auth:sanctum');
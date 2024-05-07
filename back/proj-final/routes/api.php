<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TokenController;


//User routes
Route::get('user', [TokenController::class, 'user'])->middleware('auth:sanctum');
Route::post('register', [TokenController::class, 'register'])->middleware('guest');
Route::post('login', [TokenController::class, 'login'])->middleware('guest');
Route::post('logout', [TokenController::class, 'logout'])->middleware('auth:sanctum');
Route::post('authorize', [TokenController::class, 'authorize'])->middleware('auth:sanctum');
Route::post('unauthorize', [TokenController::class, 'unauthorize'])->middleware('auth:sanctum');
Route::post('branca', [TokenController::class, 'branca'])->middleware('auth:sanctum');
//Events routes
Route::apiResource('events', EventController::class)->middleware('auth:sanctum');
//Tasques routes
Route::get('tasks/list', [TaskController::class, 'index'])->middleware('auth:sanctum');
Route::get('tasks/{task}', [TaskController::class, 'show'])->middleware('auth:sanctum');
Route::post('tasks/create', [TaskController::class, 'create'])->middleware('auth:sanctum');
Route::post('tasks/{task}', [TaskController::class, 'update'])->middleware('auth:sanctum');
Route::delete('tasks/{task}', [TaskController::class, 'delete'])->middleware('auth:sanctum');
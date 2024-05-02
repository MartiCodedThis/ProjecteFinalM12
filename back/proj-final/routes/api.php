<?php

use App\Http\Controllers\EventController;
use App\Http\Controllers\TascaController;
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
Route::get('events/list', [EventController::class, 'index'])->middleware('auth:sanctum');
Route::get('events/{event}', [EventController::class, 'show'])->middleware('auth:sanctum');
Route::post('events/create', [EventController::class, 'create'])->middleware('auth:sanctum');
Route::post('events/{event}', [EventController::class, 'update'])->middleware('auth:sanctum');
Route::delete('events/{event}', [EventController::class, 'delete'])->middleware('auth:sanctum');
//Tasques routes
Route::get('tasques/list', [TascaController::class, 'index'])->middleware('auth:sanctum');
Route::get('tasques/{event}/list', [TascaController::class, 'event_tasks'])->middleware('auth:sanctum');
Route::get('tasques/{user}/list', [TascaController::class, 'user_tasks'])->middleware('auth:sanctum');
Route::get('tasques/{tasca}', [TascaController::class, 'show'])->middleware('auth:sanctum');
Route::post('tasques', [TascaController::class, 'create'])->middleware('auth:sanctum');
Route::post('tasques/{tasca}', [TascaController::class, 'update'])->middleware('auth:sanctum');
Route::delete('tasques/{tasca}', [TascaController::class, 'delete'])->middleware('auth:sanctum');
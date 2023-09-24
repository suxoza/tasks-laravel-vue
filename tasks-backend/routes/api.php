<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::middleware(['guest'])->group(function () {
    Route::post('/register', 'App\Http\Controllers\AuthController@register');
    Route::post('/login', 'App\Http\Controllers\AuthController@login');
    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
    Route::get('/refresh-token', 'App\Http\Controllers\AuthController@refreshToken');
});

Route::middleware(['jwt.auth', 'CheckTaskOwnership'])->group(function () {
    Route::resource('/tasks', 'App\Http\Controllers\TasksController');
    Route::patch('/tasks/set-status/{task}', 'App\Http\Controllers\TasksController@setStatus')->where('task', '[0-9]+');
});


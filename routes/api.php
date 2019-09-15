<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->get('/user', 'ProfileController@user' );

Route::post('/attendances', 'AttendanceController@store');
Route::get('/auth', 'ProfileController@auth');
Route::middleware('auth:api')->group(function () {
    Route::post('/users/attendances/search', 'UserController@searchAttendance');
    Route::get('/users/search', 'UserController@search');
    Route::post('/download', 'DownloadController@download');
    Route::get('/users/create', 'UserController@create');
    Route::get('/user/{user}/attendances', 'UserController@attendances');
    Route::get('/attendances', 'AttendanceController@index');
    Route::get('/users/edit/{user}', 'UserController@edit');
    Route::get('/settings/', 'UserController@edit');
    Route::get('/settings/{setting}', 'SettingController@show');
    Route::post('/settings', 'SettingController@store');
    Route::get('/settings', 'SettingController@index');
    Route::post('/users/{user}', 'UserController@destroy');
    Route::post('/holidays/{holiday}', 'HolidayController@destroy');
    Route::post('/events/{event}', 'EventController@destroy');
    Route::post('/uploads/{upload}', 'UploadController@destroy');
    Route::apiResources([
        '/holidays' => 'HolidayController',
        '/events' => 'EventController',
        '/users' => 'UserController',
        '/uploads' => 'UploadController',
    ], ['except' => ['destroy', 'update']]);
});

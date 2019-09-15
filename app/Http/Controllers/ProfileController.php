<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
class ProfileController extends Controller
{
    public function user(Request $request) {
        $setting = \App\Setting::with('image')->first();
        return ['user' => User::whereId($request->user()->id)->with('image')->first(), 'setting' => $setting] ;
    }

    public function home()
    {
        return view('welcome');
    }

    public function auth()
    {
        $setting = \App\Setting::with('image')->first();
        return response()->json($setting, 200);
    }
}

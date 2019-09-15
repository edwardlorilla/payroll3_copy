<?php

namespace App\Http\Controllers;
use App\Setting;
use Illuminate\Http\Request;
use Intervention\Image\ImageManager;

class SettingController extends Controller
{
    public function index()
    {
        return response()->json(\App\Setting::with('image')->first(), 200);
    }
    public function store(Request $request)
    {

        $manager = new ImageManager();
        $setting = Setting::updateOrCreate(['name' => $request->name]);
        if ($file = $request->file('file')) {
            if (!(empty($request->photo))) {
                unlink(public_path() . '/upload/' . $request->image['url']);
            }
            $resize = $manager->make($file->getRealPath())->fit(200)->encode('jpg');
            $hash = md5($resize->__toString());
            $path = "upload/{$hash}.jpg";
            $resize->save(public_path($path));
            if ($request->id && $request->image['url']) {
                if (file_exists(public_path('/upload/' . $request->image['url']))) {
                    unlink(public_path('/upload/' . $request->image['url']));
                }
                $setting->image()->update(['url' => "{$hash}.jpg", 'data->type' => 'logo']);
            } else {
                $setting->image()->create(['url' => "{$hash}.jpg", 'data'=>['type' => 'logo']]);
            }

        }

        if (!(empty($request->photo))) {
            \App\Image::where('id', (int)$request->photo_id)->delete();
        }
        return response()->json($setting->with('image')->first(), 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        return response()->json($setting->with('image')->first(), 200);
    }
}

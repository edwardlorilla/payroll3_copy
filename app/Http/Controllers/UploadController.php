<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
class UploadController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if ($file = $request->file('file')) {
            $manager = new ImageManager();
            $name = time() . $file->getClientOriginalName();
            list($width, $height, $type, $attr) = getimagesize($file);
            $resize = $manager->make($request->file('file')->getRealPath())
                ->fit(round($width / 3), round($height / 3));
            $path = "upload/100_{$name}";
            $resize->save(public_path($path));
            $file->move('upload', $name);
            if ($request->id && $request->url) {
                if (file_exists(public_path('/upload/' . $request->url))) {
                    unlink(public_path('/upload/' . $request->url));
                }
                if (file_exists(public_path('/upload/100_' . $request->url))) {
                    unlink(public_path('/upload/100_' . $request->url));
                }
                auth()->user()->image()->update(['url' => $name, 'data->type' => 'profile']);
            } else {
                auth()->user()->image()->create(['url' => $name, 'data' => ['type' => 'profile']]);
            }
        }

        return response()->json([ 'url' => $name], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

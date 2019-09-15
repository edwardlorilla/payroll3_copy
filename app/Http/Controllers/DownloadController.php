<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DownloadController extends Controller
{
    public function download(Request $request)
    {
        $input = $this->validate($request, [
            'file' => 'required'
        ]);
        return response()->download($input['file'], 'export.xml' );
    }
}

<?php

namespace App\Http\Controllers;

use App\Holiday;
use Illuminate\Http\Request;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Holiday::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
            ->with('user')
            ->paginate());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date_issued' => 'required',
            'date_due_for_return' => 'required',
        ]);
        $holiday = new Holiday;
        $holiday->user_id = $input['user_id'];
        $holiday->date_issued = date("Y-m-d H:i:s", strtotime($input['date_issued']));
        $holiday->date_due_for_return =  date("Y-m-d H:i:s", strtotime($input['date_due_for_return']));
        $holiday->save();
        return response()->json($holiday);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Holiday  $holiday
     * @return \Illuminate\Http\Response
     */
    public function show(Holiday $holiday)
    {
        return response()->json(Holiday::whereId($holiday->id)->with('user')->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Holiday  $holiday
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Holiday $holiday)
    {
        $input = $request->validate([
            'user_id' => 'required|exists:users,id',
            'date_issued' => 'required',
            'date_due_for_return' => 'required',
        ]);
        $holiday->user_id = $input['user_id'];
        $holiday->date_issued = date("Y-m-d H:i:s", strtotime($input['date_issued']));
        $holiday->date_due_for_return = date("Y-m-d H:i:s", strtotime($input['date_due_for_return']));
        $holiday->save();
        return response()->json($holiday);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Holiday  $holiday
     * @return \Illuminate\Http\Response
     */
    public function destroy(Holiday $holiday)
    {
        return response()->json($holiday->delete());
    }
}

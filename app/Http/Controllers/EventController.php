<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Event::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
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
            'start_date' => 'required',
            'end_date' => 'required',
            'occurrence' => 'required',
            'memo' => 'required',
        ]);
        $event = new Event;
        $event->start_date = date("Y-m-d H:i:s", strtotime($input['start_date']));
        $event->end_date = date("Y-m-d H:i:s", strtotime($input['end_date']));
        $event->occurrence = $input['occurrence'];
        $event->memo = $input['memo'];
        $event->save();
        return response()->json($event);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        return response()->json(Event::whereId($event->id)->first());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        $input = $request->validate([
            'start_date' => 'required',
            'end_date' => 'required',
            'occurrence' => 'required',
            'memo' => 'required',
        ]);

        $event->start_date = date("Y-m-d H:i:s", strtotime($input['start_date']));
        $event->end_date = date("Y-m-d H:i:s", strtotime($input['end_date']));
        $event->occurrence = $input['occurrence'];
        $event->memo = $input['memo'];
        $event->save();
        return response()->json($event);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        return response()->json($event->delete());
    }
}

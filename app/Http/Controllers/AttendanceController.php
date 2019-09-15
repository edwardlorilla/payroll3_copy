<?php

namespace App\Http\Controllers;

use App\Attendance;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AttendanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Attendance::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->search(request('search'))
            ->with('user')
            ->paginate());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'idno' => 'integer|min:6',
        ]);
        $response = [];
        $status_in = '';
        $started_date = date("Y-m-d H:i:s");
        $user = \App\User::where('id_number', $request->idno)->first();
        if ($user) {
            $yesterday = $user->attendances()->whereDate('started_at', '!=', date("Y-m-d"))->whereNull('stopped_at');
            $today = $user->attendances()->whereDate('started_at', date("Y-m-d"))->whereNull('stopped_at');


            $attendance = $user->attendances()->whereNull('stopped_at');
            if ($request->timeInOut) {
                if($user->time_in == null){
                    $status_in = "Ok";
                } else {
                    $sched_clock_in_time_24h = date("H.i", strtotime($user->time_in));
                    $time_in_24h = date("H.i", strtotime($this->localTimezone($request->timezone)));
                    if ($time_in_24h <= $sched_clock_in_time_24h) {
                        $status_in = 'In Time';
                    } else {
                        $status_in = 'Late Arrival';
                    }
                }
                if ($user->addHours() && $yesterday->exists()) {
                    //if stopped at is not filled by default would add five hours
                    foreach ($yesterday->get() as &$value) {
                        $started_at = $value->started_at;
                        $yesterday->update(['started_at' => $started_at, 'stopped_at' => Carbon::parse($started_at)->addHours($user->addHours())]);
                    }

                }
                if (!$user->attendances()->whereDate('started_at', date("Y-m-d"))->exists()) {
                    $response = ['message' => '(' . $status_in .') Time In at .' . $this->localTimezone($request->timezone) . ' Success!', 'fullname' => $user->name];
                    $user->attendances()->create(['started_at' => $started_date]);
                } else {

                    $response = $today->exists() ? ['type'=> 'info' , 'message' => 'You already Time In today at ' . $this->localTimezone($request->timezone, $today->first()->started_at), 'fullname' => $user->name] :['message' => '(' . $status_in .') Time In at .' . $this->localTimezone($request->timezone) . ' Success!', 'fullname' => $user->name];
                    if(!$today->exists()){
                        $user->attendances()->create(['started_at' => $started_date]);
                    }
                }
            } else {
                $stopped_date = date("Y-m-d H:i:s");
                if($user->time_out == null) {
                    $status_out = "Ok";
                } else {
                    $sched_clock_out_time_24h = date("H.i", strtotime($user->time_out));
                    $time_out_24h = date("H.i", strtotime($this->localTimezone($request->timezone)));
                    if($time_out_24h >= $sched_clock_out_time_24h) {
                        $status_out = 'On Time';
                    } else {
                        $status_out = 'Early Departure';
                    }
                }
                if ($attendance->exists()) {

                    $attendance->update(['started_at' => $attendance->first()->started_at, 'stopped_at' => $stopped_date]);
                    $response = ['message' => '(' . $status_out .') Time Out at .' . $this->localTimezone($request->timezone) . ' Success!', 'fullname' => $user->name];
                } else {
                    $stopped = $user->attendances()->whereDate('started_at', date("Y-m-d"))->whereDate('stopped_at', date("Y-m-d"))->first();
                    $user->attendances()->whereDate('started_at', date("Y-m-d"))->whereDate('stopped_at', date("Y-m-d"))->update(['started_at'=>$stopped->started_at, 'stopped_at' => $stopped_date ]);
                    $response = ['type'=> 'info', 'message' => 'Overwrite Time out today at ' . $this->localTimezone($request->timezone, $stopped->stopped_at), 'fullname' => $user->name];
                }
            }
        }else{
            $response = ['message' => 'cannot verify id number.'];
        }


        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function show(Attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function edit(Attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Attendance $attendance
     * @return \Illuminate\Http\Response
     */
    public function destroy(Attendance $attendance)
    {
        //
    }

    /**
     * @param Request $request
     * @return \DateTime
     */
    public function localTimezone($timezone, $time = 'now')
    {
        $dt = new \DateTime($time);

        $tz = new \DateTimeZone($timezone);
        $dt->setTimezone($tz);


        return $dt->format('Y-m-d h:i:s A');
    }
}

<?php

namespace App\Http\Controllers;

use App\User;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(User::orderBy(request('column') ? request('column') : 'updated_at', request('direction') ? request('direction') : 'desc')
            ->with('image')
            ->search(request('search'))
            ->paginate());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $roles = \App\Role::with('permissions')->get();
        $jobs = \App\Job::all();
        return response()->json(['roles' => $roles, 'jobs' => $jobs], 200);
    }

    public function search()
    {
        return response()->json(User::search(request('search'))->paginate());
    }

    public function searchAttendance(Request $request)
    {
        $this->validate(request(), [
            'year' => 'required'
        ]);
        $this->validate($request, [
            'user_id' => 'required'
        ]);
        $from = request('year') . '-' . request('month') . '-' . (request('range') == '1' ? '16' : '01');
        $to = request('year') . '-' . request('month') . '-' . (request('range') == '1' ? date("t", strtotime($from)) : '15');
        return response()->json(['leaves' => \App\Holiday::whereUserId($request->user_id)->get(), 'events' => \App\Event::whereDate('start_date', '>=', $from)->whereDate('end_date', '<=', $to)->get(), 'users' => User::where('id', $request->user_id)->with(['attendances' => function ($query) use ($from, $to) {
            $query->whereDate('created_at', '>=', $from)->whereDate('created_at', '<=', $to)->whereNotNull('stopped_at');
        }])->paginate()]);
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
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $request->id,
            'id_number' => '|min:6|unique:users,id_number,'. $request->id,
            'password' => '',
            'job_id' => 'required',
            'confirm_password' => 'same:password',
            'roles' => '',
            'file' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'time_in' => 'required', //|date_format:H:i|before:time_in
            'time_out' => 'required',//|date_format:H:i|after:time_in
            'address' => '',
            'incase_of_emergency' => '',
            'date_started' => '',
            'sss_number' => '',
            'philhealth_number' => '',
            'pagibig_number' => '',
            'salary' => '',
            'sss_deduction' => '',
            'philhealth_deduction' => '',
            'pagibig_deduction' => '',
            'sss_loan' => '',
            'pagibig_loan' => '',
        ]);
        if (trim($request->password) == '') {
            $input = $request->except(['password', 'file']);
        } else {
            $input =  $request->except('file');
            $input['password'] = bcrypt($request->password);
        }

        $model = User::updateOrCreate(
            ['id' => $request->id],
            $input);
        if ($request->roles) {
            $model->syncRoles($input['roles']);
        }

        if ($file = $request->file('file')) {
            $manager = new ImageManager();
            $name = time() . $file->getClientOriginalName();
            list($width, $height, $type, $attr) = getimagesize($file);
            $resize = $manager->make($request->file('file')->getRealPath())
                ->fit(round($width / 3), round($height / 3));
            $path = "upload/100_{$name}";
            $resize->save(public_path($path));
            $file->move('upload', $name);
            if ($request->id && $request->image['url']) {
                if (file_exists(public_path('/upload/' . $request->image['url']))) {
                    unlink(public_path('/upload/' . $request->image['url']));
                }
                if (file_exists(public_path('/upload/100_' . $request->image['url']))) {
                    unlink(public_path('/upload/100_' . $request->image['url']));
                }
                $model->image()->update(['url' => $name, 'data->type' => 'profile']);
            } else {
                $model->image()->create(['url' => $name, 'data' => ['type' => 'profile']]);
            }
        }

        return response()->json($model, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $roles = \App\Role::all();
        $permissions = \App\Permission::all();
        $jobs = \App\Job::all();
        return response()->json(['user' => User::where('id', $user->id)->with('image', 'roles', 'permissions')->first()->makeHidden(['job', 'attendances']), 'roles' => $roles, 'permissions' => $permissions, 'jobs' => $jobs], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {

        $this->validate($request, [
            'old_password' => 'required',
            'new_password' => 'required|min:6',
            'confirm_password' => 'required|same:new_password',
        ]);
        $data = $request->all();
        if (!Hash::check($data['old_password'], $user->password)) {
            return response()->json('The specified password does not match the database password', 500);
        } else {
            return response()->json($user->update(['password' => bcrypt($request->new_password)]), 200);
        }
    }


    public function attendances(User $user)
    {
        $currentMonth = date('m');
        $attendanceFunction = function ($query) use ($currentMonth) {
            $query->whereMonth('started_at', $currentMonth);
        };
        $attendance = User::whereId($user->id)->with(['attendances' => $attendanceFunction])->whereHas('attendances', $attendanceFunction)->first();
        return response()->json($attendance ? $attendance->makeHidden(['job', 'can', 'employee_pay', 'job_id', 'roles']) : []);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User $user
     * @return \Illuminate\Http\Response
     */
    public function post(User $user)
    {
       dd(1);
        return response()->json(null, 204);
    }
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }
}
<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laratrust\Traits\LaratrustUserTrait;
use Nicolaslopezj\Searchable\SearchableTrait;
use Laravel\Passport\HasApiTokens;
use Carbon\Carbon;

class User extends Authenticatable
{
    use LaratrustUserTrait,SearchableTrait, HasApiTokens,Notifiable;

    protected $appends = ['can', 'roles', 'total_timing', 'employee_pay', 'present'];
    protected $searchable = [
        'columns' => [
            'users.name' => 1,
            'users.email' => 2,
        ]
    ];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sss_deduction', 'philhealth_deduction', 'pagibig_deduction', 'sss_loan', 'pagibig_loan', 'salary', 'name', 'email', 'password', 'job_id', 'id_number', 'time_in', 'time_out', 'address', 'incase_of_emergency', 'date_started', 'sss_number', 'philhealth_number', 'pagibig_number',
    ];
    public function getRolesAttribute()
    {
        $roles = [];
        foreach (Role::all() as $role) {
            if (auth()->user()->hasRole($role->name)) {
                $roles[$role->name] = true;
            } else {
                $roles[$role->name] = false;
            }
        }
        return $roles;
    }
    public function getPresentAttribute(){

        return $this->attendances()->whereDate('created_at', Carbon::today())->whereNull('stopped_at')->first();
    }
    public function getCanAttribute()
    {
        $permissions = [];
        foreach (Permission::all() as $permission) {
            if (auth()->user()->can($permission->name)) {
                $permissions[$permission->name] = true;
            } else {
                $permissions[$permission->name] = false;
            }
        }
        return $permissions;
    }
    public function addHours()
    {
        return 5;
    }
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    public function leaves()
    {
        return $this->hasMany(Holiday::class);
    }
    public function attendances(){
        return $this->hasMany(Attendance::class);
    }
    public function getEmployeePayAttribute()
    {
        return $this->salary ? ($this->total_timing * 0.0002777778) * (int)$this->salary : 0;
    }

    public function getTotalTimingAttribute()
    {
        return $this->attendances ? $this->attendances->reduce(function ($total, Attendance $attendance) {
            return $total + $attendance->timing;
        }, 0) : 0;
    }
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function images()
    {
        return $this->morphMany(Image::class, 'imageable');
    }
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }


}

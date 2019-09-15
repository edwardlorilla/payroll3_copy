<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Nicolaslopezj\Searchable\SearchableTrait;
class Attendance extends Model
{
    use SearchableTrait;
    protected $appends = ['timing'];
    protected $fillable = ['started_at', 'stopped_at'];
    protected $searchable = [
        'columns' => [
            'users.name' => 1,
            'attendances.started_at' => 2,
            'attendances.stopped_at' => 3,
        ],
        'joins' =>[
            'users' => ['attendances.user_id', 'users.id']
        ]
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function getTimingAttribute()
    {
        if ($this->stopped_at) {
            return Carbon::parse($this->stopped_at)->diffInSeconds(Carbon::parse($this->started_at)) ;
        }
        return 0;
    }
}

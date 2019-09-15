<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Event extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'events.start_date' => 4,
            'events.end_date' => 2,
            'events.occurrence' => 3,
            'events.memo' => 1,
        ]
    ];
    protected $fillable = ['start_date', 'end_date', 'occurrence', 'memo'];

}

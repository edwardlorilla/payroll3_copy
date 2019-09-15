<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Nicolaslopezj\Searchable\SearchableTrait;
class Holiday extends Model
{
    use SearchableTrait;
    protected $searchable = [
        'columns' => [
            'holidays.date_issued' => 4,
            'holidays.date_due_for_return' => 2,
            'holidays.date_return' => 3,
            'users.name' => 5
        ],
        'joins' => [
            'users' => ['holidays.user_id', 'users.id'],
        ],
    ];
    protected $fillable = ['date_issued', 'date_due_for_return', 'date_return', 'user_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

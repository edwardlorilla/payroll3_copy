<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['url', 'type', 'data'];
    protected $casts = [
        'data' => 'array'
    ];
    public function imageable()
    {
        return $this->morphTo();
    }
}

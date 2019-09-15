<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'name'
    ];
    public function image()
    {
        return $this->morphOne(Image::class, 'imageable');
    }
}

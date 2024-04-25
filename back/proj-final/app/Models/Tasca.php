<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tasca extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'responsable',
        'description',
        'visibility',
        'status',
        'author_id',
        'event_id',
        'data_limit'
    ];

    public function user(){
        return $this->belongsToMany(User::class, 'tasques_usuari');
    }
}

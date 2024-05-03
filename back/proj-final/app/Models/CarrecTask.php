<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarrecTask extends Model
{
    use HasFactory;
    protected $fillable = [
        'task_id',
        'carrec_id'
    ];

    public function responsable()
    {
        return $this->belongsTo(Carrec::class);
    }
    
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}

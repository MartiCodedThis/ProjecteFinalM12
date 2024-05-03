<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BrancaTask extends Model
{
    use HasFactory;
    protected $fillable = [
        'task_id',
        'branca_id'
    ];

    public function responsable()
    {
        return $this->belongsTo(Branca::class);
    }
    
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}

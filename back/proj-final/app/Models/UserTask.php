<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTask extends Model
{
    use HasFactory;
    protected $fillable = [
        'task_id',
        'user_id',
        'user_name'
    ];

    public function responsable()
    {
        return $this->belongsTo(User::class);
    }
    
    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}

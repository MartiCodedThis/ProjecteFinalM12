<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Task;

class UpdateTasks extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-tasks';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Checks the status of each task and sets it to due if its past its limit date';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tasks = Task::all();
        foreach($tasks as $task){
            if($task->status == 0){
                $now = new \DateTime();
                if($task->data_limit < $now){
                    $task->status = 2;
                    $task->save();
                }
            }
        }
    }
}

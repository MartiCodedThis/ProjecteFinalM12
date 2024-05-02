<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->string('responsable');
            $table->string('visibility');
            $table->integer('status');
            $table->integer('author_id');
            $table->integer('event_id');
            $table->string('data_limit');
            $table->timestamps();


            $table->foreign('author_id')
                ->references('id')->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');
             $table->foreign('event_id')
                ->references('id')->on('events')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};

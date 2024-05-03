<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Branca;
use App\Models\Carrec;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'admin',
            'email' => 'tcp@admin.com',
            'password' => bcrypt('adminadmin'),
            'role_id' => 1,
            'authorized' => true
        ]);

        $b = new Branca;
        $b->create([
            'name' => 'follets',
            'color'=>'#87f542'
        ]);
        $b->create([
            'name' => 'llobatons',
            'color'=>'#ed1f1f'
        ]);
        $b->create([
            'name' => 'puputs',
            'color'=>'#c71fed'
        ]);
        $b->create([
            'name' => 'rangers',
            'color'=>'#f5e50c'
        ]);


        $c = new Carrec;
        $c->create([
            'name' => 'equip_agrupament'
        ]);
        $c->create([
            'name' => 'pedagogic'
        ]);
        $c->create([
            'name' => 'tresoreria'
        ]);
        $c->create([
            'name' => 'secretaria'
        ]);
    }
}

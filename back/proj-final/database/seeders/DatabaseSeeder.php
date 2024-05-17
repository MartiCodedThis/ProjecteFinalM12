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
        $adminName = env('ADMIN_NAME', 'default_admin');
        $adminEmail = env('ADMIN_EMAIL', 'default@admin.com');
        $adminPassword = env('ADMIN_PASSWORD', 'Defaultpassword1.');

        User::factory()->create([
            'name' => $adminName,
            'email' => $adminEmail,
            'password' => $adminPassword,
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

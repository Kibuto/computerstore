<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class UserTablesSeeder extends Seeder
{
    public function insert_data($email, $name, $username)
    {
        DB::table('users')->insert([
            'name' => $name,
            'email' => $email,
            'email_verified_at' => now(),
            'username' => $username,
            'password' => bcrypt('123456'),
            'remember_token' => Str::random(10),
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
            "role" => "user"
        ]);
    }
    public function run()
    {
        $this->insert_data('annaan@aaa.com', 'TORNNG', 'bakbkah');
    }
}

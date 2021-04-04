<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CategoryTablesSeeder extends Seeder
{
    public function insert_data($name)
    {
        DB::table('categories')->insert([
            'name' => $name,
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
    public function run()
    {
        $this->insert_data('category 001');
        $this->insert_data('category 002');
        $this->insert_data('category 003');
    }
}

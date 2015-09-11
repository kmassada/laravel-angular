<?php

use Illuminate\Database\Seeder;
use App\Tag;

// Composer: "fzaninotto/faker"
use Faker\Factory as Faker;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $faker = Faker::create();
      foreach(range(1, 5) as $index)
      {
        Tag::create([
          'name' => $faker->word()
        ]);
      }
    }
}

## Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/d/total.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

## Angular Framework

## Official Laravel Documentation

Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Official Angular Documentation

Documentation for the framework can be found on the [Angular website](https://angularjs.org).

## PROJECT

We've created a [full CRUD Laravel App](https://github.com/kmassada/laravel-angular/tree/basic-laravel)

We made Laravel an [API serving app ](https://github.com/kmassada/laravel-angular/tree/basic-laravel-api)

We imported angular resources into our [hybrid app ](https://github.com/kmassada/laravel-angular/tree/angular-init)

We've built the [angular app ](https://github.com/kmassada/laravel-angular/tree/laravel-angular-1.0)where we can leverage laravel for crud operations. As discussed

now we work to improve the laravel side of the house
*expansion*
#### using laravel we generate resources to attach priorities to our tasks

generate resources

```bash
php artisan make:model Priority --migration
php artisan make:seeder PrioritiesTableSeeder
php artisan make:seeder TaskPrioritiesTableSeeder
```

establish one to many relationship in the models
in task

```
return $this->belongsTo('App\Priority');
```

in priority
```php
return $this->hasMany('App\Task');
```

we modify each priority items by mapping them and iterating over them, a-la-ruby
```
Task::all()->map(function($item){
    $item->priority_id=rand(1,4);
  });
```

#### add helpers for Migrations

In the next section we create a pivot table to allow for migration. I've discussed most of the tools I use, in a blog post: [laravel-additional-resources](http://blog.kmassada.com/laravel-5-additional-resources/)

#### using laravel we add Tags to our tasks
generate resources like the previous example we need one for tags model, its migration, and one for tags, and task tags

we also need a pivot table, we generate here. `php artisan [make:migration:pivot](https://github.com/laracasts/Laravel-5-Generators-Extended) tags tasks`

we also establish one to many relationship for tags and tasks. with `hasMany` and `belongsTo`

we change the way we save, update or create task, by adding 2 functions, one to create the tags

```php
private function createTask(TaskRequest $request) {
  $task=Task::create($request->all());
  $this->syncTags($task, $request->input('tag_list'));

  return $task;
}
```

and the second one by syncing the tags

```php
private function syncTags(Task $task, array $tags) {
  $task->tags()->sync($tags);
}
```

of course we migrate and each seed the tables we've created

```bash
php artisan migrate
php artisan db:seed --class="..class name.."
```

or the brute force way, reload entire table

```bash
composer dump-autoload
php artisan migrate:refresh
php artisan db:seed
```


### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

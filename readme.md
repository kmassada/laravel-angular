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


## PROJECT

### Creating a new  Laravel project

composer create

```bash
composer create-project laravel/laravel laravel5-ng --prefer-dist
```

get Homestead sample dev config and setup homestead

```bash
wget https://gist.githubusercontent.com/kmassada/052380e8490b8196ef87/raw/4ecb82bc37ecd6c05f49f3372121afc12aad743f/Homestead.yml
git clone https://github.com/laravel/homestead.git Homestead
mkdir -p Homestead/.homestead
ssh-keygen -t rsa -f "Homestead/.homestead/homestead@laravel5-ng.dev" -C "homestead@laravel5-ng.dev"
```
**EDIT CONFIG FILE TO MATCH NEW ENV VARIABLES**

bring up homestead

```bash
cd Homestead/
composer install
./homestead up
```

install few packages

```bash
composer require illuminate/html
composer require fzaninotto/faker
```

Add to the config/app.php providers array:

```
    Illuminate\Html\HtmlServiceProvider::class,
```

Add to the config/app.php aliases array:

```
    'Html'      => Illuminate\Html\HtmlFacade::class,
    'Form'      => Illuminate\Html\FormFacade::class,
```

### Setup laravel for crud

create Model, Controller, View

```bash
php artisan make:model Task
php artisan make:controller TaskController
mkdir -p resources/views/tasks
touch resources/views/tasks/{template,index,create,edit,view}.blade.php
```

make seeds and migrations

```bash
php artisan make:seeder TasksTableSeeder
php artisan make:migration create_tasks_table
```

fill in data per ERD then migrate

```bash
php artisan migrate
```

verify model fields has fillable data at app/Task.php

```php
class Task extends Model
{
  protected $fillable=['*'];
}
```

verify database/seeds/DatabaseSeeder.php has the TasksTableSeeder class

```php
$this->call(TasksTableSeeder::class);
```

seed db

```bash
php artisan db:seed
```

create routes

```bash
$ vi app/Http/routes.php
Route::resource('task', 'TaskController');
```

verify routes

```bash
php artisan route:list
```

bind parameter to model in `app/Providers/RouteServiceProvider.php`

```PHP
public function boot(Router $router)
{
    parent::boot($router);

    $router->bind('tasks', function($id) {
        return \App\Task::find($id);
    });
}
```

create request for validation

```bash
php artisan make:request TaskRequest
```

please review the following files from this branch for more details on the simple crud

app/Http/Controllers/TaskController.php
app/Http/Requests/TaskRequest.php
app/Http/routes.php
app/Providers/RouteServiceProvider.php
app/Task.php
config/app.php
database/migrations/2015_09_09_173434_create_tasks_table.php
database/seeds/DatabaseSeeder.php
database/seeds/TasksTableSeeder.php
resources/views/tasks/create.blade.php
resources/views/tasks/edit.blade.php
resources/views/tasks/index.blade.php
resources/views/tasks/template.blade.php
resources/views/tasks/view.blade.php

### Notes

```bash
php artisan make:...

make:controller             
make:middleware             
make:migration              
make:provider               
make:listener               
make:request                
make:console                
make:command                
make:seeder                 
make:policy                 
make:model                  
make:event                  
make:job  

------------------

php artisan route:list   
```

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)

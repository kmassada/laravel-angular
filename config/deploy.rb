# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'pathfinder.tadbit.cc'
set :repo_url, 'git@github.com:kmassada/laravel-angular.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, '/var/www/pathfinder.tadbit.cc'

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
# set :linked_files, fetch(:linked_files, []).push('config/database.yml', 'config/secrets.yml')

# Default value for linked_dirs is []
# set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
    task :restart do
      on roles(:app), in: :sequence, wait: 5 do
        execute "sudo httpd -k restart"
      end
    end

  desc 'Composer - install'
  task :composer_install do
    on roles(:app), in: :sequence do
      within release_path do
        execute 'cd #{current_path}'
        execute 'composer install  --no-dev --quiet'
      end
    end
  end

  desc 'Database - setup'
  task :databas_setup do
    on roles(:app), in: :sequence do
      within release_path do
        upload(".env.production", "#{current_path}/.env")
      end
    end
  end

  desc 'Database - Migration'
  task :database_migration do
    on roles(:app), in: :sequence do
      within release_path do
        execute 'cd #{current_path}'
        execute 'yes|php artisan migrate'
      end
    end
  end

  desc 'Database - Seed'
  task :database_seed do
    on roles(:app), in: :sequence do
      within release_path do
        execute 'cd #{current_path}'
        execute 'yes|php artisan db:seed'
      end
    end
  end

  desc 'Application - FIxes'
  task :database_seed do
    on roles(:app), in: :sequence do
      within release_path do
        execute 'cd #{current_path}'
        execute 'chmod 777 -R storage'
      end
    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
      # within release_path do
      #   execute :rake, 'cache:clear'
      # end
    end
  end

  before :updated, 'deploy:ghost_install'
  before :updated, 'deploy:ghost_symlink'
  after :publishing, :restart
end

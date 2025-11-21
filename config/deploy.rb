lock "~> 3.19.0"

set :application, "wwwHoneyOps"
set :repo_url, "git@github.com:aanciones/wwwHoneyOps.git"
set :branch, "main"

set :deploy_to, "/var/www/#{fetch(:application)}"

set :deploy_user, "deploy"
set :server_name, "portal.honeyops.net"

# rbenv
set :rbenv_type, :user
set :rbenv_ruby, "3.3.0"

append :linked_files, "config/credentials/production.key", ".env"
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "storage", "node_modules"

set :bundle_without, %w[development test].join(" ")
set :keep_releases, 5

# --- Puma ---
set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,   "#{shared_path}/tmp/pids/puma.pid"

set :puma_threads, [4, 8]
set :puma_workers, 2
set :puma_preload_app, true
set :puma_init_active_record, true

set :puma_access_log, "#{shared_path}/log/puma_access.log"
set :puma_error_log,  "#{shared_path}/log/puma_error.log"
set :puma_service_unit_name, "#{fetch(:application)}_puma"
set :nginx_server_name, fetch(:server_name)

# --- Hooks existentes (los mantenemos) ---
before "deploy:publishing", "provision:puma_config"
after  "deploy:published",  "provision:puma_systemd"
after  "deploy:published",  "provision:nginx"

# === Cron / Whenever (tareas propias para evitar "no Gemfile") ===
namespace :cron do
    desc "Limpiar crons legacy con identifier antiguo (si quedó 'honeyops')"
    task :pre_clear_legacy do
        on roles(:app) do
        within current_path do
            with rails_env: fetch(:rails_env, fetch(:stage)) do
            execute :bundle, :exec, :whenever, "--clear-crontab", "honeyops"
            end
        end
        end
    end


  desc "Actualizar crontab con Whenever (en current_path)"
  task :update do
    on roles(:app) do
      within current_path do
        with rails_env: fetch(:rails_env, fetch(:stage)) do
          execute :bundle, :exec, :whenever,
                  "--update-crontab", "#{fetch(:application)}_#{fetch(:stage)}",
                  "--set", "environment=#{fetch(:rails_env, fetch(:stage))}&path=#{current_path}"
        end
      end
    end
  end

  desc "Borrar crontab de Whenever (por si rollback)"
  task :clear do
    on roles(:app) do
      within current_path do
        with rails_env: fetch(:rails_env, fetch(:stage)) do
          execute :bundle, :exec, :whenever,
                  "--clear-crontab", "#{fetch(:application)}_#{fetch(:stage)}"
        end
      end
    end
  end
end

# Hooks: usar nuestras tareas en lugar de whenever:update_crontab
before "cron:update", "cron:pre_clear_legacy"
after "deploy:published", "cron:update"
after "deploy:reverted",  "cron:update"

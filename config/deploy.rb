# ===============================
#   CAPISTRANO CONFIG GLOBAL
# ===============================

lock "~> 3.19.0"

set :application, "wwwHoneyOps"
set :repo_url, "git@github.com:aanciones/wwwHoneyOps.git"
set :branch, "main"

set :deploy_to, "/var/www/#{fetch(:application)}"

# Deployment user
set :deploy_user, "deploy"
set :server_name, "portal.honeyops.net"

# ===============================
#   RUBY / RBENV
# ===============================

set :rbenv_type, :user
set :rbenv_ruby, "3.3.0"

# ===============================
#   LINKED FILES & DIRECTORIES
# ===============================

# IMPORTANTE: para que Rails pueda leer los credentials
append :linked_files, "config/master.key"

append :linked_dirs,
  "log",
  "tmp/pids",
  "tmp/cache",
  "tmp/sockets",
  "public/system",
  "storage",
  "node_modules"

set :bundle_without, %w[development test].join(" ")
set :keep_releases, 5

# ===============================
#   PUMA CONFIG
# ===============================

set :puma_bind, "unix://#{shared_path}/tmp/sockets/puma.sock"
set :puma_state, "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,   "#{shared_path}/tmp/pids/puma.pid"

set :puma_threads, [4, 8]
set :puma_workers, 2
set :puma_preload_app, true
set :puma_init_active_record, true

set :puma_access_log, "#{shared_path}/log/puma_access.log"
set :puma_error_log,  "#{shared_path}/log/puma_error.log"

# Nombre del servicio systemd generado por capistrano3-puma
set :puma_service_unit_name, "#{fetch(:application)}_puma"

# Para los templates de nginx (si algún día los usas)
set :nginx_server_name, fetch(:server_name)

# ===============================
#   PUMA & NGINX HOOKS
# ===============================
#
# IMPORTANTE:
# - No llamamos ya a provision:puma_systemd ni provision:nginx.
# - El propio plugin capistrano3-puma ya engancha puma:restart
#   al ciclo de deploy.
#
# Si algún día quieres automatizar nginx, lo hacemos aparte.

# (sin hooks personalizados)

# ===============================
#   CRON / WHENEVER
# ===============================

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

# Hooks: usar nuestras tareas propias
before "cron:update", "cron:pre_clear_legacy"
after  "deploy:published", "cron:update"
after  "deploy:reverted",  "cron:update"

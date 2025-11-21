# ===============================
# Capistrano setup
# ===============================

# Carga el DSL y los stages (production, etc.)
require "capistrano/setup"

# Tareas básicas de deploy (deploy, rollback, etc.)
require "capistrano/deploy"

# ===============================
# SCM (Git)
# ===============================

require "capistrano/scm/git"
install_plugin Capistrano::SCM::Git

# ===============================
# Ruby / Bundler / Rails assets / Yarn
# ===============================

require "capistrano/rbenv"
require "capistrano/bundler"

# Solo assets de Rails (NO migraciones, no usas DB)
require "capistrano/rails/assets"

require "capistrano/yarn"

# ===============================
# Puma + systemd + Nginx
# ===============================

# Estas tareas vienen del gem "capistrano3-puma"
require "capistrano/puma"          # tareas base (puma:config, puma:start, etc.)
require "capistrano/puma/systemd"  # servicio systemd (puma:systemd:config/enable/start)
require "capistrano/puma/nginx"    # vhost nginx (puma:nginx_config/enable/reload)

# Registrar los plugins para que las tareas de Puma, systemd y Nginx estén
# disponibles durante el deploy. Sin estas llamadas, Rake no define las
# tareas (ej. puma:config), provocando los mensajes de "Tarea ... no
# disponible" en los hooks de provision.
install_plugin Capistrano::Puma
install_plugin Capistrano::Puma::Systemd
install_plugin Capistrano::Puma::Nginx

# ===============================
# Custom tasks
# ===============================

# Carga las tareas personalizadas de lib/capistrano/tasks/*.rake
Dir.glob("lib/capistrano/tasks/*.rake").sort.each { |r| import r }

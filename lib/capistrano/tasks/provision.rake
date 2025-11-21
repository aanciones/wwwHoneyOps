# lib/capistrano/tasks/provision.rake

namespace :provision do
  desc "Generar la configuración de Puma (capistrano3-puma)"
  task :puma_config do
    invoke "puma:config"
  end

  desc "Configurar y arrancar Puma via systemd (capistrano3-puma)"
  task :puma_systemd do
    invoke "puma:systemd:config"
    invoke "puma:systemd:enable"
    invoke "puma:systemd:start"
  end

  desc "Generar configuración de Nginx para Puma (capistrano3-puma)"
  task :nginx do
    invoke "puma:nginx_config"
    invoke "puma:nginx:enable"
    invoke "puma:nginx:reload"
  end
end

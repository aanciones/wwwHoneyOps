# lib/capistrano/tasks/provision.rake

namespace :provision do
  desc "Obsoleto: la configuración de Puma la gestiona capistrano3-puma"
  task :puma_config do
    # no-op
  end

  desc "Obsoleto: gestión systemd de Puma (ya no se usa)"
  task :puma_systemd do
    # no-op
  end

  desc "Obsoleto: generación automática de nginx (lo haremos a mano)"
  task :nginx do
    # no-op
  end
end

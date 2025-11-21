namespace :provision do
  desc "Generar la configuración de Puma"
  task :puma_config do
    if Rake::Task.task_defined?("puma:config")
      invoke "puma:config"
    else
      puts "Tarea puma:config no disponible"
    end
  end

  desc "Configurar y arrancar Puma via systemd"
  task :puma_systemd do
    %w[puma:systemd:config puma:systemd:enable puma:systemd:start].each do |task_name|
      if Rake::Task.task_defined?(task_name)
        invoke task_name
      else
        puts "Tarea #{task_name} no disponible"
      end
    end
  end

  desc "Generar configuración de Nginx para Puma"
  task :nginx do
    if Rake::Task.task_defined?("puma:nginx_config")
      invoke "puma:nginx_config"
    else
      puts "Tarea puma:nginx_config no disponible"
    end

    %w[puma:nginx:enable puma:nginx:reload].each do |task_name|
      if Rake::Task.task_defined?(task_name)
        invoke task_name
      else
        puts "Tarea #{task_name} no disponible"
      end
    end
  end
end

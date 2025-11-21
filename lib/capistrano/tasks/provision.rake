namespace :provision do
  def invoke_task!(task_name)
    unless Rake::Task.task_defined?(task_name)
      abort "La tarea #{task_name} no está disponible. Asegúrate de tener capistrano3-puma cargado en Capfile."
    end

    Rake::Task[task_name].invoke
    Rake::Task[task_name].reenable
  end

  desc "Generar la configuración de Puma"
  task :puma_config do
    invoke_task!("puma:config")
  end

  desc "Configurar y arrancar Puma via systemd"
  task :puma_systemd do
    %w[puma:systemd:config puma:systemd:enable puma:systemd:start].each { |task_name| invoke_task!(task_name) }
  end

  desc "Generar configuración de Nginx para Puma"
  task :nginx do
    invoke_task!("puma:nginx_config")
    %w[puma:nginx:enable puma:nginx:reload].each { |task_name| invoke_task!(task_name) }
  end
end

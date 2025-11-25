Rails.application.routes.draw do
  # --- DOMINIO DE DOCUMENTACIÓN ---
  # docs.honeyops.test → DocsController#index
  constraints(lambda { |req| req.subdomain == "docs" }) do
    root to: "docs#index", as: :docs_root

    # Ejemplo de más rutas de documentación:
    # get "/getting-started", to: "docs#getting_started"
  end

  # --- DOMINIO PRINCIPAL ---
  # honeyops.test y www.honeyops.test → MainController#home
  constraints(lambda { |req|
    req.subdomain.blank? || req.subdomain == "www"
  }) do
    root to: "main#home"

    # Legal
    get "/cookies", to: "legal#cookies", as: :cookies
    get "/privacy", to: "legal#privacy", as: :privacy   # opcional, para más adelante

  end

  # --- MANTENIMIENTO / SALUD ---
  get "up" => "rails/health#show", as: :rails_health_check

  # --- PWA ---
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end

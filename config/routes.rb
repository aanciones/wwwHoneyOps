Rails.application.routes.draw do
  get "/favicon.ico", to: redirect("/favicon.png")
  get "/sitemap.xml", to: "seo#sitemap"

  # --- DOMINIO DE DOCUMENTACIÓN ---
  # docs.honeyops.test -> DocsController#index
  get "/", to: "docs#index", as: :docs_root, constraints: ->(req) { req.subdomain == "docs" }
  get "*path", to: "docs#index", constraints: ->(req) { req.subdomain == "docs" && !req.path.include?(".") }

  # --- DOMINIO PRINCIPAL ---
  # honeyops.test y www.honeyops.test -> MainController
  constraints(lambda { |req|
    req.subdomain.blank? || req.subdomain == "www"
  }) do
    root to: "main#home"

    get "/how-it-works", to: "main#how_it_works", as: :how_it_works
    get "/integrations", to: "main#integrations", as: :integrations
    get "/pricing", to: "main#pricing", as: :pricing
    get "/faq", to: "main#faq", as: :faq
    get "/contact", to: "main#contact", as: :contact

    # Legal
    get "/cookies", to: "legal#cookies", as: :cookies
    get "/privacy", to: "legal#privacy", as: :privacy
  end

  # --- MANTENIMIENTO / SALUD ---
  get "up" => "rails/health#show", as: :rails_health_check

  # --- PWA ---
  get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
  get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
end

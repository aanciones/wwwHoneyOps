host = ENV.fetch("CANONICAL_HOST", "honeyops.net")
SitemapGenerator::Sitemap.default_host = "https://#{host}"
SitemapGenerator::Sitemap.include_root = false

SitemapGenerator::Sitemap.create do
  view_lastmod = lambda do |path|
    full_path = Rails.root.join(path)
    next unless File.exist?(full_path)

    File.mtime(full_path).utc
  end

  add "/", lastmod: view_lastmod.call("app/views/main/home.html.erb"), changefreq: "weekly", priority: 1.0
  add "/how-it-works", lastmod: view_lastmod.call("app/views/main/how_it_works.html.erb"), changefreq: "weekly", priority: 0.9
  add "/integrations", lastmod: view_lastmod.call("app/views/main/integrations.html.erb"), changefreq: "weekly", priority: 0.8
  add "/pricing", lastmod: view_lastmod.call("app/views/main/pricing.html.erb"), changefreq: "weekly", priority: 0.9
  add "/faq", lastmod: view_lastmod.call("app/views/main/faq.html.erb"), changefreq: "monthly", priority: 0.7
  add "/contact", lastmod: view_lastmod.call("app/views/main/contact.html.erb"), changefreq: "monthly", priority: 0.7
  add "/cookies", lastmod: view_lastmod.call("app/views/legal/cookies.html.erb"), changefreq: "yearly", priority: 0.3
  add "/privacy", lastmod: view_lastmod.call("app/views/legal/privacy.html.erb"), changefreq: "yearly", priority: 0.3
end

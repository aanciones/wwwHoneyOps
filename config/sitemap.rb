host = ENV.fetch("CANONICAL_HOST", "honeyops.net")
SitemapGenerator::Sitemap.default_host = "https://#{host}"

SitemapGenerator::Sitemap.create do
  view_lastmod = lambda do |path|
    full_path = Rails.root.join(path)
    next unless File.exist?(full_path)

    File.mtime(full_path).utc
  end

  add "/", lastmod: view_lastmod.call("app/views/main/home.html.erb"), changefreq: "weekly", priority: 1.0
  add "/cookies", lastmod: view_lastmod.call("app/views/legal/cookies.html.erb"), changefreq: "yearly"
  add "/privacy", lastmod: view_lastmod.call("app/views/legal/privacy.html.erb"), changefreq: "yearly"
end

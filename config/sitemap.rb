host = ENV.fetch("CANONICAL_HOST", "honeyops.net")
SitemapGenerator::Sitemap.default_host = "https://#{host}"

def view_lastmod(path)
  full_path = Rails.root.join(path)
  return unless File.exist?(full_path)

  File.mtime(full_path).utc
end

SitemapGenerator::Sitemap.create do
  add "/", lastmod: view_lastmod("app/views/main/home.html.erb"), changefreq: "weekly", priority: 1.0
  add "/cookies", lastmod: view_lastmod("app/views/legal/cookies.html.erb"), changefreq: "yearly"
  add "/privacy", lastmod: view_lastmod("app/views/legal/privacy.html.erb"), changefreq: "yearly"
end

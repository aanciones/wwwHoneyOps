require "cgi"
require "time"

module DocsSitemapGenerator
  NAV_PATH = Rails.root.join("app/javascript/docs/nav.ts")
  CONTENT_ROOT = Rails.root.join("public/docs-content")
  OUTPUT_PATH = Rails.root.join("public/docs-sitemap.xml")

  def self.generate!
    files = extract_nav_files
    urls = build_urls(files)
    write_sitemap(urls)
  end

  def self.extract_nav_files
    return [] unless File.exist?(NAV_PATH)

    File.read(NAV_PATH).scan(/file:\s*"([^"]+)"/).flatten.uniq
  end

  def self.build_urls(files)
    host = ENV.fetch("DOCS_HOST", "https://docs.honeyops.net")

    files.filter_map do |relative_path|
      source = CONTENT_ROOT.join(relative_path)
      next unless File.exist?(source)

      path = file_to_path(relative_path)
      loc = "#{host}#{path}"
      lastmod = File.mtime(source).utc.iso8601
      { loc: loc, lastmod: lastmod }
    end
  end

  def self.file_to_path(relative_path)
    clean = relative_path.sub(/\.md\z/, "")
    return "/" if clean == "overview"

    "/#{clean}"
  end

  def self.write_sitemap(urls)
    xml = +"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
    xml << "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n"
    urls.each do |entry|
      xml << "  <url>\n"
      xml << "    <loc>#{CGI.escapeHTML(entry[:loc])}</loc>\n"
      xml << "    <lastmod>#{entry[:lastmod]}</lastmod>\n"
      xml << "  </url>\n"
    end
    xml << "</urlset>\n"

    File.write(OUTPUT_PATH, xml)
  end
end

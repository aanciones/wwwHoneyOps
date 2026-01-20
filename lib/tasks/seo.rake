namespace :seo do
  desc "Generate sitemaps for honeyops.net and docs.honeyops.net"
  task generate_sitemaps: :environment do
    Rake::Task["sitemap:create"].invoke
    DocsSitemapGenerator.generate!
  end
end

class SeoController < ApplicationController
  def sitemap
    if request.subdomain == "docs"
      path = Rails.root.join("public/docs-sitemap.xml")
      if File.exist?(path)
        send_file path, type: "application/xml", disposition: "inline"
      else
        head :not_found
      end
    else
      redirect_to "/sitemap.xml.gz", status: :moved_permanently
    end
  end
end

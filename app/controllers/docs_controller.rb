class DocsController < ApplicationController
  before_action :redirect_legal_pages

  def index
  end

  private

  def redirect_legal_pages
    path = request.path.sub(/\/+$/, "")
    return unless ["/privacy", "/cookies"].include?(path)

    target_host = request.host.sub(/\Adocs\./, "")
    redirect_to "#{request.protocol}#{target_host}#{path}", allow_other_host: true
  end
end

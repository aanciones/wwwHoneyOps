class CanonicalHost
  def initialize(app, canonical_host:)
    @app = app
    @canonical_host = canonical_host
  end

  def call(env)
    request = Rack::Request.new(env)
    www_host = "www.#{@canonical_host}"

    if request.host == www_host
      canonical_url = request.url.sub(
        %r{://#{Regexp.escape(www_host)}},
        "://#{@canonical_host}"
      )
      return [
        301,
        { "Location" => canonical_url, "Content-Type" => "text/html" },
        ["Moved Permanently"]
      ]
    end

    @app.call(env)
  end
end

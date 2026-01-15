class LegalController < ApplicationController
  def cookies
    redirect_to root_path(anchor: "cookies")
  end

  def privacy
    redirect_to root_path(anchor: "privacy")
  end
end

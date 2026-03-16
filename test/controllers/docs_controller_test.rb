require "test_helper"

class DocsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get docs_root_url(host: "docs.example.com")
    assert_response :success
  end
end

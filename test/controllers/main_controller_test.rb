require "test_helper"

class MainControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get root_url
    assert_response :success
  end

  test "should get contact" do
    get contact_url
    assert_response :success
  end
end

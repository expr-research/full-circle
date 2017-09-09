class ApplicationController < ActionController::Base
  include Authorize

  protect_from_forgery with: :exception
  helper_method :current_user

  private

    def current_user
      @current_user ||= User.find(session[:user_id])
    end
end

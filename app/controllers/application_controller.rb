class ApplicationController < ActionController::API
    include ActionController::Cookies
    # before_action :authorize

  def current_user
    User.find_by(id: session[:user_id])
  end

  def authorize
    render json: { errors: ["Not authorized"] }, status: :unauthorized unless current_user
  end

  def logged_in?
    !!current_user
  end
    
  end

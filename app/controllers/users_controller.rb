class UsersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    
    def index
        users = User.all
        render json: users
    end

    def show
        render json: current_user
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = find_user
        user.update(user_params)
        render json: user
    end

    private

    def find_user
        user = User.find(params[:id])
    end

    def user_params
        params.permit(:email, :password)
    end

    def render_not_found_response
        render json: { error: "User not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

end

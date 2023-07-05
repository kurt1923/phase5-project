class BuildsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        builds = Build.all
        render json: builds
    end

    def show
        build = find_build
        render json: build
    end

    def create
        user = find_user
        build = user.builds.create!(build_params)
        render json: build, status: :created
    end

    def update
        user = find_user
        build = user.builds.find(params[:id])
        build.update!(build_params)
        render json: build
    end

    def destroy
        user = find_user
        build = user.builds.find(params[:id])
        build.destroy
        head :no_content
    end

    private

    def find_build
        build = Build.find(params[:id])
    end

    def find_user
        user = User.find(params[:user_id])
    end

    def build_params
        params.permit(:name, :title, :info, :hero, :user_id)
    end

    def render_not_found_response
        render json: { error: "Build not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end



end

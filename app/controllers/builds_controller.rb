class BuildsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        builds = Build.all
        render json: builds, Serializer: BuildSerializer
    end

    def show
        builds = find_build
        render json: builds, Serializer: BuildSerializer
    end


    # def create
    #     user = find_user
    #     build = user.builds.create!(build_params)
    #     render json: build, status: :created
    # end

    def create
        user = find_user
        build = user.builds.new(build_params)
      
        # Create the build_items, item_specials, and calculate total_stats
        build.transaction do
          build.save!
          build.create_build_items_from_random_items
          build.save!
        end
      
        render json: build, status: :created
      end

      def update
        puts "Updating build..."
        user = current_user
        build = user.builds.find(params[:id])
        build.update!(build_params)
        puts "Build updated successfully."
        render json: build
      end

    def destroy
        user = current_user
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
        params.permit(:id, :name, :title, :info, :hero, :user_id, :wins, :losses, :favorites)
    end

    def render_not_found_response
        render json: { error: "Build or User not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end



end

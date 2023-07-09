class BuildItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        build_items = BuildItem.all
        render json: build_items
    end

    def show
        build_item = find_build_item
        render json: build_item
    end

    def create
        puts build_item_params
        build = find_build
        build_item = build.build_items.create!(build_item_params)
        render json: build_item, status: :created
    end

    def update
        build = find_build
        build_item = build.build_items.find(params[:id])
        build_item.update!(build_item_params)
        render json: build_item
    end

    def destroy
        build = find_build
        build_item = build.build_items.find(params[:id])
        build_item.destroy
        head :no_content
    end
    
    private

    def find_build_item
        build_item = BuildItem.find(params[:id])
    end
    
    def find_build
        build = Build.find(params[:build_id])
    end

    def build_item_params
        params.permit(:build_id, :item_id)
    end

    def render_not_found_response
        render json: { error: "Build Item not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end



end

class ItemsController < ApplicationController
    
    def index
        items = Item.all
        render json: items
    end

    def show
        item = find_item
        render json: item
    end

    def find_item_by_name
        item = Item.where('lower(name) = ?', params[:name].downcase).first
        if item
          render json: item
        else
          render json: { error: 'Item not found' }, status: :not_found
        end
    end
end

private

def find_item
    item = Item.find(params[:id])
end



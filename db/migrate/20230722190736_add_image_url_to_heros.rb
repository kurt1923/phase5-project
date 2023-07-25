class AddImageUrlToHeros < ActiveRecord::Migration[7.0]
  def change
    add_column :heros, :image_url, :string
  end
end

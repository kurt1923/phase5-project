class AddWinsLossesFavoritesToBuilds < ActiveRecord::Migration[7.0]
  def change
    add_column :builds, :wins, :integer
    add_column :builds, :losses, :integer
    add_column :builds, :favorites, :boolean
  end
end

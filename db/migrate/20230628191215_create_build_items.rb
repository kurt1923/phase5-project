class CreateBuildItems < ActiveRecord::Migration[7.0]
  def change
    create_table :build_items do |t|
      t.integer :build_id
      t.integer :item_id

      t.timestamps
    end
  end
end

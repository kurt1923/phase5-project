class CreateBuilds < ActiveRecord::Migration[7.0]
  def change
    create_table :builds do |t|
      t.string :hero
      t.string :title
      t.string :info
      t.integer :user_id

      t.timestamps
    end
  end
end

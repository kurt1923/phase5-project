class CreateHeros < ActiveRecord::Migration[7.0]
  def change
    create_table :heros do |t|
      t.string :name
      t.string :role
      t.string :auto
      t.string :passive
      t.string :ability_1
      t.string :ability_2
      t.string :ability_3
      t.string :ultimate
      t.integer :basic_attack
      t.integer :ability_power
      t.integer :durability
      t.integer :mobility
      t.integer :difficulty

      t.timestamps
    end
  end
end

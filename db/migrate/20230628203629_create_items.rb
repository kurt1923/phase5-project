class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :classification
      t.string :category
      t.string :special
      t.integer :physical_power
      t.integer :physical_penetration
      t.integer :critical_strike
      t.integer :magical_power
      t.integer :magical_penetration
      t.integer :health
      t.integer :health_regen
      t.integer :physical_armor
      t.integer :magical_armor
      t.integer :mana 
      t.integer :mana_regen
      t.integer :attack_speed
      t.integer :ability_haste
      t.integer :movement_speed
      t.integer :tenacity
      t.integer :life_steal
      t.integer :magical_life_steal
      t.integer :heal_and_shield_power
      t.integer :omnivamp 

      t.timestamps
    end
  end
end

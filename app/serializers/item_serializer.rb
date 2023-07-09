class ItemSerializer < ActiveModel::Serializer
  # has_many :build_items
  # has_many :builds, through: :build_items
  attributes :id, :name, :classification, :category, :special, :physical_power, :physical_penetration, :critical_strike, :magical_power, :magical_penetration, :health, :health_regen, :physical_armor, :magical_armor, :mana, :mana_regen, :attack_speed, :ability_haste, :movement_speed, :tenacity, :life_steal, :magical_life_steal, :heal_and_shield_power, :omnivamp

  def attributes(*args)
    hash = super

    # Exclude attributes with a value of 0
    hash.delete_if { |_, value| value == 0 }

    hash
  end
end

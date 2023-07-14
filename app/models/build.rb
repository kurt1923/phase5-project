class Build < ApplicationRecord
    has_many :build_items
    has_many :items, through: :build_items
    belongs_to :user

    def create_build_items_from_random_items
      # Create 6 new build_item models with random item_id values
      6.times do
        random_item_id = Item.pluck(:id).sample
        build_items.create!(item_id: random_item_id)
      end
    end

    def calculate_total_stats
        total_stats = {
          physical_power: 0,
          physical_penetration: 0,
          critical_strike: 0,
          magical_power: 0,
          magical_penetration: 0,
          health: 0,
          health_regen: 0,
          physical_armor: 0,
          magical_armor: 0,
          mana: 0,
          mana_regen: 0,
          attack_speed: 0,
          ability_haste: 0,
          movement_speed: 0,
          tenacity: 0,
          life_steal: 0,
          magical_life_steal: 0,
          heal_and_shield_power: 0,
          omnivamp: 0
        }
    
        self.build_items.each do |build_item|
            item = build_item.item
      
            total_stats.each_key do |stat|
              value = item.send(stat)
              total_stats[stat] += value if value.is_a?(Integer) && value != 0
            end
          end
      
          total_stats.reject { |_, value| value.zero? }
        end


end

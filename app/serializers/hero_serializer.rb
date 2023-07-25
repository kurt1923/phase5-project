class HeroSerializer < ActiveModel::Serializer
  attributes :id, :name, :role, :auto, :passive, :ability_1, :ability_2, :ability_3, :ultimate, :basic_attack, :ability_power, :durability, :mobility, :difficulty, :image_url
end

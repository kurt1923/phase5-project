class BuildSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :build_items
  attributes :id, :hero, :title, :info, :user_id, :total_stats, :item_specials, :wins, :losses, :favorites, :user


  def total_stats
    object.calculate_total_stats
  end

  def item_specials
    specials = []
    object.build_items.each do |build_item|
      item = build_item.item
      specials << { Special: item.special } if item.special.present?
    end
    specials
  end
end

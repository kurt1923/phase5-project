class BuildSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :build_items
  attributes :id, :hero, :title, :info, :user_id, :total_stats, :item_specials, :wins, :losses, :favorites, :user, :win_rate, :created_at, :build_items


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

  def win_rate
    wins = object.wins || 0
    losses = object.losses || 0
    total_matches = wins + losses
    return 0 if total_matches == 0
  
    (wins.to_f / total_matches * 100).round(2)
  end

  def created_at
    object.created_at.strftime("%m/%d/%Y")
  end
end

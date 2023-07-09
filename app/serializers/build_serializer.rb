class BuildSerializer < ActiveModel::Serializer
  belongs_to :user
  has_many :build_items
  attributes :id, :hero, :title, :info, :user_id
end

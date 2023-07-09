class BuildItemSerializer < ActiveModel::Serializer
  belongs_to :build
  belongs_to :item
  attributes :id, :build_id, :item_id
end

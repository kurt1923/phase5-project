class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :type, :category, :special
end

class BuildSerializer < ActiveModel::Serializer
  attributes :id, :hero, :title, :info, :user_id
end

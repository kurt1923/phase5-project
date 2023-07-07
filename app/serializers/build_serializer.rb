class BuildSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :hero, :title, :info, :user_id
end

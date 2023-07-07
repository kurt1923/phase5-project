class UserSerializer < ActiveModel::Serializer
  has_many :builds
  attributes :id, :email
end

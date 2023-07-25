class Item < ApplicationRecord
    has_one_attached :image
    has_many :build_items
    has_many :builds, through: :build_items
end

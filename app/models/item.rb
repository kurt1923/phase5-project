class Item < ApplicationRecord
    has_many :build_items
    has_many :builds, through: :build_items
end

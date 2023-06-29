class Item < ApplicationRecord
    has_many :build_items
    has_many :items
end

class Build < ApplicationRecord
    has_many :build_items
    has_many :items, through: :build_items
end
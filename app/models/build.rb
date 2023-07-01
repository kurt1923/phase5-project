class Build < ApplicationRecord
    has_many :build_items
    has_many :items, through: :build_items

    # validate :validate_build_items_count
    # private

    # def validate_build_items_count
    #   if build_items.size > 7
    #     errors.add(:build_items, 'cannot exceed 7')
    #   end
    # end
end

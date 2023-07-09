class BuildItem < ApplicationRecord
    belongs_to :build
    belongs_to :item, optional: true

    # validate :validate_max_build_items

    # private
  
    # def validate_max_build_items
    #   max_build_items = 6
    #   if build.build_items.count >= max_build_items
    #     errors.add(:base, "Cannot add more than #{max_build_items} build items")
    #   end
    # end
    
end

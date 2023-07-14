class BuildItem < ApplicationRecord
    belongs_to :build
    belongs_to :item, optional: true

    
end

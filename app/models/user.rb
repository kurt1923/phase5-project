class User < ApplicationRecord
    has_many :builds
    has_secure_password
end

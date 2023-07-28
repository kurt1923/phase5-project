class User < ApplicationRecord
    has_many :builds
    has_secure_password
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validates :favorite_hero, presence: true
end

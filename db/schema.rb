# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_06_28_203629) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "build_items", force: :cascade do |t|
    t.integer "build_id"
    t.integer "item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "builds", force: :cascade do |t|
    t.string "hero"
    t.string "title"
    t.string "info"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "name"
    t.string "type"
    t.string "category"
    t.string "special"
    t.integer "physical_power"
    t.integer "physical_penetration"
    t.integer "critical_strike"
    t.integer "magical_power"
    t.integer "magical_penetration"
    t.integer "health"
    t.integer "health_regen"
    t.integer "physical_armor"
    t.integer "magical_armor"
    t.integer "mana"
    t.integer "mana_regen"
    t.integer "attack_speed"
    t.integer "ability_haste"
    t.integer "movement_speed"
    t.integer "tenacity"
    t.integer "life_steal"
    t.integer "magical_life_steal"
    t.integer "heal_and_shield_power"
    t.integer "omnivamp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

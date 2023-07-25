Rails.application.routes.draw do
  resources :heros
  resources :items
  resources :build_items
  resources :builds
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/me', to: 'users#show'
  get '/itemsbyname/:name', to: 'items#find_item_by_name'
end

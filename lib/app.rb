require 'sinatra'

class App < Sinatra::Base

  get '/' do
    erb :index
  end

  get '/levelone' do
    erb :levelone
  end

  get '/leveltwo' do
    erb :leveltwo
  end

end
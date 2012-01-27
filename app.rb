$:.unshift File.dirname(__FILE__) + '/lib'

require 'aws-sdk'
require 'sinatra'
require 'dynamo_record'
require 'slim'
require 'json'

class Task < DynamoRecord
end

get '/' do
  @tasks = Task.all

  slim :index
end

get '/get/:id' do
  task = Task.find(params[:id])
  halt 404, "Task not found" unless task
  
  content_type :json
  task.attributes.to_h.to_json
end

post '/update/:id' do  
  task = Task.find_instance(params['id'])

  task['name'] = params['name']
  task['tags'] = params['tags']

  content_type :json
  params.to_json
end

post '/create' do
  task = Task.create(:name => params['name'], :tags => params['tags'])

  content_type :json
  task.attributes.to_h.to_json
end

post '/delete/:id' do
  task = Task.find(params[:id])
  task.delete 

  content_type :json
  {}.to_json
end

get '/style.css' do
  scss :style
end
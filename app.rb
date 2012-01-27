$:.unshift File.dirname(__FILE__) + '/lib'


require 'aws-sdk'
require 'sinatra'
require 'dynamo_record'
require 'slim'


class Task < DynamoRecord
end

get '/' do
  @tasks = [
    { "name" => "Cook dinner" },
    { "name" => "Walk the dog" },
  ]

  slim :index
end

get '/style.css' do
  scss :style
end
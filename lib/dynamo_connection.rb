require 'aws'
require 'aws/dynamo_db'

class DynamoConnection

  def self.instance
    @instance ||= self.new
  end

  def initialize
    @db = AWS::DynamoDB.new    
  end

end

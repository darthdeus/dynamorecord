$:.unshift File.dirname(__FILE__)
require 'dynamo_connection'

class DynamoRecord

  class TableNotFoundException < Exception; end

  class << self
    def table_name(name = nil)
      @name = name if name

      if @name
        return @name
      else
        # TODO - needed better pluralization here
        (self.to_s + "s").downcase
      end
    end

    def establish_connection
      @db = DynamoConnection.instance
      @table_name = table_name
      # Initialize the schema
      begin
        @db.tables[@table_name].status
      rescue AWS::DynamoDB::Errors::ResourceNotFoundException
        raise DynamoRecord::TableNotFoundException
      end
    end

  end
  

  def initialize
    @attributes = {}
  end

  def table_name=(name)
    @table_name = name
  end

  def table_name
    return @table_name.to_s if @table_name
    self.class.table_name.to_s
  end


  # Set an attribute
  def []=(name, value)
    @attributes[name] = value
  end


  # Retrieve an attribute with a given name
  def [](name)
    @attributes[name]
  end
end

require 'dynamo_connection'

class DynamoRecord

  class << self
    def table_name(name = nil)
      @name = name if name

      if @name
        return @name
      else
        # TODO - needed better pluralization here
        (self.to_s + "s").to_sym.downcase
      end
    end

    def inherited(klass)
      puts "Inherited #{klass} and self is #{self}, initializing db connection"

      @db = DynamoConnection.instance
    end
  end

  

  def initialize
    @attributes = {}
  end

  def table_name
    self.class.table_name
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

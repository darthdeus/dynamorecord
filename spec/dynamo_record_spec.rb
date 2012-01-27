require 'rspec'

class DynamoRecord
  def self.table_name(name = nil)
    @name = name if name
    @name
  end

  def table_name
    self.class.table_name
  end
end


describe DynamoRecord do

  before(:each) do
    # Undefine the class and ignore the exception if the class isn't defined yet
    Object.send(:remove_const, :Task) rescue NameError
  end

  it "has a table" do
    class Task < DynamoRecord
      table_name :tasks
    end

    t = Task.new
    t.table_name.should == :tasks
  end

  it "sets a default table name from the class" do
    class Task < DynamoRecord; end
    t = Task.new
    t.table_name.should == :tasks
  end

end
$:.unshift File.dirname(__FILE__) + '/../lib'

require 'rspec'
require 'dynamo_record'

describe DynamoRecord do

  before(:each) do
    # We don't actually want to touch AWS while testing
    DynamoConnection.stub!(:instance).and_return(double)
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

  it "allows to retrieve attributes via hash notation" do
    class Task < DynamoRecord; end

    t = Task.new
    t["name"] = "foobar"
    t["name"].should == "foobar"
  end

end
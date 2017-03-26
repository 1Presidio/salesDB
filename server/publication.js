Meteor.publish('lists.public', function() {
  return Lists.find({
    userId: {$exists: false}
  }, {
    fields: Lists.publicFields
  });
});

//Publishing for customerNames
Meteor.publish('customerNames', function(){
  return customers.find();
});

//Publishing for Sales Table
Meteor.publish('salesDataView', function(){
  return salesRecord.find();
});


//Publishing for Updating a Sale
Meteor.publish('salesUpdate',   function(id){
  return customers.find(id);
});

Template.salesDataViewEdit.helpers  ({
  salesDoc: function(){
    return salesRecord.findOne()
  }
})

Template.salesDataViewEdit.events ({

  'click #infoButton':function(e,t){
// alert("Hello and welcome to the customer Setup Sheet!\nUnder 'customer name' put in the customer's name with Capital letters, correct Standard English, and appropriate spelling \n \n Under 'description' describe the customer and explain a little bit about 'em so other new employees can get up to date!")
    bootbox.alert("Update the customer name and description as needed. Then click Submit.");
  }
})

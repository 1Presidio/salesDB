AutoForm.addHooks('insertForm',
  {

    onSuccess: function()  {
      Router.go('/current');
    },
    onError: function(formType, error) {console.log(error);},

})

Template.sales.helpers({
  customerSel: function(){
    var customerNameSel = customers.find().fetch();
    return _.map(customerNameSel, function(value,key){

         return {
           label: value.customerName,
           value: value.customerName
         };
       });
  }
})

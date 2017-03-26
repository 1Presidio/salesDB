//Routes for the loading Icon and error 404
Router.configure({
  notFoundTemplate: 'not_found',
  loadingTemplate: 'loadingIcon',
});

//Route for current files  -- nav bar
Router.route('/sales', {name: 'currentFiles'});


//Route for customer setup sheet
Router.route('/sales/customers', {name: 'postCustomers'});


//Route for CSV upload/Manual Input
Router.route('/sales/Upload', {name:'anythingelse',
  waitOn:function(){
    return Meteor.subscribe('customerNames')
  },
  data:function(){
    return customers.find().fetch();
  }
});


//Route for list of all the customers
Router.route('/sales/customers/viewAll',  {name:'customersList',
waitOn:function(){
  return Meteor.subscribe('customerNames')
},
})


//Route for Editing a Customer/Description
Router.route('/sales/customers/update/:id',  {name:'updateCustomers',
waitOn:function(){
  return Meteor.subscribe('salesUpdate',this.params.id)
},
})

//Route for Sales Table
Router.route('/sales/dataView', {name:'salesDataView',
waitOn:function(){
  return Meteor.subscribe('salesDataView')
},
data:function(){
  return salesRecord.find().fetch();
}});

//Route for Editing a Sales Transaction
Router.route('/sales/update/:id',  {name:'salesDataViewEdit',
waitOn:function(){
  return Meteor.subscribe('salesUpdate',this.params.id)
},
})

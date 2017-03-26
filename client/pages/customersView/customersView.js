Template.customersList.helpers ({
  customers: function(){

    return customers.find()

  },

  settings: function () {
    return {
        rowsPerPage: 10,
        showFilter: true,
        fields: [
            { key: 'customerName', label: 'Customer Name' },
            { key: 'description', label: 'Description'    },

            {key:'_id',label:'Update Customer Profile',cellClass:'col-md-2',
                          fn:function(value){

                            return new Spacebars.SafeString("<a href=/sales/customers/update/"+value+">Update</a>")
                                }
          }
        ]
    }
}
})

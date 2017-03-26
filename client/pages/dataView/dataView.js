Template.salesDataView.helpers ({
  salesCollection: function(){

    return salesRecord.find()

  },

  settings: function () {
    return {
        rowsPerPage: 10,
        showFilter: true,
        fields: [

            { key: 'customerName', label: 'Customer Name' },

            { key: 'itemName', label: 'Item Name/Stock Number'},

            { key: 'qtySold', label: 'Quantity Sold'},

            { key: 'qtyReturned', label: 'Quantity Returned'},

            { key: 'revenue', label: "Revnue (in $)"},

            { key: 'dateOfTransaction', label: 'Date of Transaction',
              fn:function(value){
                  return moment(value).format('MM-DD-YY');
              }},

            { key: 'createdAt', label: 'Date Created',
              fn:function(value){
                  return moment(value).format('MM-DD-YY');
              }},

            {key:'_id',label:'Update Sales Transaction',cellClass:'col-md-2',
                          fn:function(value){

                            return new Spacebars.SafeString("<a href=/sales/update/"+value+">Update</a>")
                          },
            }
        ]
    };
}
})

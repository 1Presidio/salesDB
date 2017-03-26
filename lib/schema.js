//docs Collection
Docs = new Mongo.Collection("docs");
Docs.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  fileId: {
    type: String
  }
}));

Files = new FS.Collection("files", {
  stores: [new FS.Store.GridFS("filesStore")]
});


// salesRecord Collection

salesRecord = new Mongo.Collection("salesRecord");

Schemas = []

Schemas.salesForm = new SimpleSchema({


  customerName: {
    type: String,
  },


  itemName: {
    type: String,

  },


  qtySold: {
    type:Number,
    optional:true,
    label:'Quantity Sold',
    min:0,
  custom:function(){
    if(!this.isSet&&this.isInsert)
      {
        if(this.siblingField('qtyReturned').value==='0')
        {
          return 'required';
        }
      }
    }
  },


  qtyReturned: {
    type:Number,
    optional:true,
    label:'Quantity Returned',
    max:0,
  custom:function(){
    if(!this.isSet&&this.isInsert)
      {
        if(this.siblingField('qtySold').value==='0')
        {
          return 'required';
        }
      }
    }
  },


  dateOfTransaction: {
    type:Date,
  },


  revenue: {
    type:Number,
  },


  createdAt:{
  type:Date,
  autoValue:function(){
    if(this.isInsert)
    {
      return new Date()
    }
  }
 },

  notes: {
    type:String,
  }
})

salesRecord.attachSchema(Schemas.salesForm);


// customers Collection

customers = new Mongo.Collection("customers");

Schemas.customers = new SimpleSchema({


  customerName: {
    type: String,
  },


  createdAt:{
  type:Date,
  autoValue:function(){
    if(this.isInsert)
    {
      return new Date()
    }
  }
 },


  description: {
   type:String
  },

})

customers.attachSchema(Schemas.customers);

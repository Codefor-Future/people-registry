const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    mobile:{
        require:true,
        type:Number
    },
    password:{
        type:String,
        require:true
    },
    visitors:[
        {
            visitorName:String,
            visitorMobile:Number,
            visitorLocation:String,
            visitorTime:String
        }
    ]
})

module.exports = mongoose.model('Shop',ShopSchema)
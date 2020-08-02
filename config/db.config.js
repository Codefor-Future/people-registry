const mongoose = require('mongoose')

const MongoUrl= process.env.MongoUrl

MongoInit=()=>{
    mongoose.connect(MongoUrl,{ useNewUrlParser: true,useUnifiedTopology: true  },function(err){
        if(err){
            console.log(err)
        }
        else{
            console.log("DB connected")
        }
    })
}

module.exports= MongoInit
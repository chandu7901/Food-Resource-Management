const mongoose=require('mongoose')

const detailsSchema = new mongoose.Schema(
    {
        admin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "admin",
          },
        messName:{
            type:String,
            required:true
        },
       totalRegistered:{
           type:Number,
           required:true
       }
    }
)

module.exports=Detail=mongoose.model('detail',detailsSchema);
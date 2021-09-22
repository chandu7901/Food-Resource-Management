const mongoose=require('mongoose')

const messSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        },
        absentL: {
            type: Boolean,
            default:true
        },

        absentD: {
           type: Boolean,
           default:true
        },
       
        date:{
            type:String,
            default:Date.now
        }
    }
)

module.exports=Mess=mongoose.model('mess',messSchema);
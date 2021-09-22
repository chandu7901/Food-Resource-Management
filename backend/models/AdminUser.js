const mongoose=require('mongoose')

const adminSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            require:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now
        }
    }
)

module.exports=Admin=mongoose.model('admin',adminSchema);
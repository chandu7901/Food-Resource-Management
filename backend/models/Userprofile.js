// contributions he made
const mongoose=require('mongoose')

const userProfileSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    contributions:{
        type:Number,
        default:0
    },
    month:{
        type:Number,
        default:1
    }
});

module.exports=UserProfile=mongoose.model('userprofile',userProfileSchema);
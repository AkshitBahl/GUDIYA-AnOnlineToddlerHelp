const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({

    name:String,
    email:String,
    mobile:Number
})

const UserModel=mongoose.model('UserModel',UserSchema)

module.exports=UserModel
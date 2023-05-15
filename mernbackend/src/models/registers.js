const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    phnumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    psame: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
})

const registers=new mongoose.model("User",userSchema);

module.exports=registers;